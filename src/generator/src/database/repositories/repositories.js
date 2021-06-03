const { objToString } = require('../../../utils')
const camelCase = require('lodash.camelcase')

async function generateRepositories(generate, entities, db) {
    const requires = {}

    for(const entity of Object.keys(entities)){
        const { name } = entities[entity].prototype.meta
        if (name.includes('Input')) continue
        lowCCName = camelCase(name)

        await generate({
            template: `data/repository/${db}/repository.ejs`,
            target: `src/data/repositories/${lowCCName}Repository.js`,
            props: { 
                name: { 
                    pascalCase: name,
                    camelCase: lowCCName
                },
                table: `${lowCCName}s`
            }
        })
        requires[name] = `require('./${lowCCName}Repository.js')` 
    }
    return requires
}

module.exports =  async ({ generate, options, filesystem }) => async () => {
    let requires = {}
    const entities = require(`${filesystem.cwd()}/src/domain/entities`)
    if(options.mongo){
        await generate({
            template: `data/database/mongo/database.ejs`,
            target: `src/data/database/database.js`,
        })        

        await generate({
            template: `data/repository/mongo/baseRepository.ejs`,
            target: `src/data/repositories/baseRepository.js`
        })

        requires = Object.assign(requires, await generateRepositories(generate, entities, 'mongo'))
    }
    if(options.postgres) {
        await generate({
            template: `data/database/postgres/database.ejs`,
            target: `src/data/database/database.js`,
        })  
        requires = Object.assign(requires, await generateRepositories(generate, entities, 'postgres'))
    }
    await generate({
        template: 'data/repository/index.ejs',
        target: `src/data/repositories/index.js`,
        props: { requires: objToString(requires) }
    })
}
