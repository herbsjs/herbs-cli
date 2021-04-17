const { propGenerate }  = require('./propGenerate')

module.exports =  async ({ generate, filesystem }) => async () => {
    const entities = require(`${filesystem.cwd()}/src/domain/entities`)
    for(const entity of Object.keys(entities)){
        const { name, schema } = entities[entity].prototype.meta
        const propGenerator = await propGenerate(schema)
        await generate({
            template: 'usecases/useCase.ejs',
            target: `src/domain/useCases/create${name}.js`,
            props: { 
                entity: name,
                request: await propGenerator.request(),
                lowerCaseEntity: name.toLowerCase(),
                example: await propGenerator.example()
            },
        })
    }
}

