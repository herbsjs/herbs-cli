async function requestString(schema){
    const obj = Object.keys(schema).reduce((obj, key) => {
        const { name, type } = schema[key]
        obj[name] = type.name;
        return obj;
      }, {});
    return JSON.stringify(obj).replaceAll('"', '')
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

