const { objToString } = require('../../../utils')
const camelCase = require('lodash.camelcase')

async function generateRepositories(generate, entities, db) {
    const requires = {}

    for(const entity of Object.keys(entities)){
        const { name } = entities[entity].prototype.meta
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
        requires[`${lowCCName}Repository`] = `new (require('./${lowCCName}Repository.js'))(conn)` 
    }
    return requires
}

module.exports =  async ({ generate, options: { mongo = false, postgres = false}, filesystem }) => async () => {
    let requires = {}
    const entities = require(`${filesystem.cwd()}/src/domain/entities`)
    if(mongo){
        await generate({
            template: `data/repository/mongo/baseRepository.ejs`,
            target: `src/data/repositories/baseRepository.js`
        })

        requires = Object.assign(requires, await generateRepositories(generate, entities, 'mongo'))
    }
    if(postgres) {
        requires = Object.assign(requires, await generateRepositories(generate, entities, 'postgres'))
    }
    await generate({
        template: 'data/repository/index.ejs',
        target: `src/data/repositories/index.js`,
        props: { requires: objToString(requires) }
    })
}
