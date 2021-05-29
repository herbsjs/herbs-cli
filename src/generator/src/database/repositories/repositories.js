const { toLowCamelCase, objToString } = require('../../../utils')

module.exports =  async ({ generate, options, filesystem }) => async () => {
    const entities = require(`${filesystem.cwd()}/src/domain/entities`)
    const requires = {}
    if(options.mongo){
        await generate({
            template: `data/database/mongo/database.ejs`,
            target: `src/data/database/database.js`,
        })        

        await generate({
            template: `data/repository/mongo/baseRepository.ejs`,
            target: `src/data/repositories/baseRepository.js`
        })

        for(const entity of Object.keys(entities)){
            const { name } = entities[entity].prototype.meta
            lowCCName = toLowCamelCase(name)

            await generate({
                template: `data/repository/mongo/repository.ejs`,
                target: `src/data/repositories/${lowCCName}Repository.js`,
                props: { 
                    name: { 
                        pascalCase: name,
                        camelCase: lowCCName
                    }
                }
            })
            requires[name] = `require('./${lowCCName}Repository.js')` 
        }
    }
    await generate({
        template: 'data/repository/index.ejs',
        target: `src/data/repositories/index.js`,
        props: { requires: objToString(requires) }
    })
}
