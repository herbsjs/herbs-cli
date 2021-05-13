const { toLowCamelCase } = require('../../utils')

module.exports =  async ({ generate, options, filesystem }) => async () => {
    const entities = require(`${filesystem.cwd()}/src/domain/entities`)

    if(options.repository === 'mongo'){
        await generate({
            template: `data/database/database.ejs`,
            target: `src/data/database/database.js`,
        })        

        for(const entity of Object.keys(entities)){
            const { name } = entities[entity].prototype.meta

            await generate({
                template: `data/repository/repository.ejs`,
                target: `src/data/repositories/${toLowCamelCase(name)}Repository.js`,
                props: { 
                    name: { 
                        pascalCase: name,
                        camelCase: toLowCamelCase(name)
                    }
                }
            })
        }
    }
}
