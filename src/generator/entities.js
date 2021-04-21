module.exports = async ({ generate, options } ) => async () => {

    const entities = [
        {
            name: "User",
            fields: `nickname: field(String),
            password: field(String)`
        }
    ]
    if (options.entities){
        // TODO: BUILD CUSTOM ENTITIES
    }
    const requires = await entities.reduce(async (requires, entity) => {
        const camelCaseEntityName = `${entity.name[0].toLowerCase()}${entity.name.slice(1)}`
        await generate({
            template: `entities/${camelCaseEntityName}.ejs`,
            target: `src/domain/entities/${camelCaseEntityName}.js`,
            props: entity
        })
        return `${entity.name}: require('./${camelCaseEntityName}.js'),
        ${requires}` 
    },'')
    await generate({
        template: 'entities/index.ejs',
        target: `src/domain/entities/index.js`,
        props: { requires }
    })
}
