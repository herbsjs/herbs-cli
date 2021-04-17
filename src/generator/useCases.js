async function prepareRequest(schema){
    const obj = {}
    Object.keys(schema).map(key => {
        const { name, type } = schema[key]
        obj[name] = type
    }
}
module.exports =  async ({ generate, filesystem }) => async () => {
    const entities = require(`${filesystem.cwd()}/src/domain/entities`)
    for(const key of Object.keys(entities)){
        const { name, schema } = entities[key].prototype.meta
        
        
        await generate({
            template: 'usecases/useCase.ejs',
            target: `src/domain/useCases/create${name}.js`,
            props: { 
                entity: name,
                request: JSON.stringify(schema)
             },
        })
    }
}

