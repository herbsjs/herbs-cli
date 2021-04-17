async function requestString(schema){
    // schema to plain JSON
    const obj = Object.keys(schema).reduce((obj, key) => {
        const { name, type } = schema[key]
        obj[name] = type.name || type.constructor.name;
        return obj;
      }, {});
    //convert plain JSON and remove quotation marks(")
    const objString = JSON.stringify(obj, null, 6)
                          .replaceAll('"', '')
    // ident last line
    return objString.substring(0, objString.length - 2) + '\n    }'
}

module.exports =  async ({ generate, filesystem }) => async () => {
    const entities = require(`${filesystem.cwd()}/src/domain/entities`)
    for(const key of Object.keys(entities)){
        const { name, schema } = entities[key].prototype.meta
        
        console.log()
        await generate({
            template: 'usecases/useCase.ejs',
            target: `src/domain/useCases/create${name}.js`,
            props: { 
                entity: name,
                request: await requestString(schema)
             },
        })
    }
}

