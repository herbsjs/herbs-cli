const useCases = ['create', 'update', 'delete', 'findOne']
const { toLowCamelCase, requiresToString } = require('./utils')

async function generateRequest (schema){
    // schema to plain JSON
    const obj = Object.keys(schema).reduce((obj, key) => {
        const { name, type } = schema[key]
        obj[name] = type.name || type.constructor.name;
        return obj;
    }, {});

    //convert plain JSON and remove quotation marks(")
    const str = JSON.stringify(obj, null, 8)
    .replaceAll('"', '')
    .split('\n')

    //remove first and last lines
    str.shift()
    str.pop()

    return str.join('\n').trim()
}

module.exports =  async ({ generate, filesystem }) => async () => {
    const entities = require(`${filesystem.cwd()}/src/domain/entities`)
    const requires = {}
    
    for(const entity of Object.keys(entities)){
        const { name, schema } = entities[entity].prototype.meta

        for(const action of useCases){
            const nameInCC = toLowCamelCase(name)
            const useCaseName = `${action}${name}`
            await generate({
                template: `usecases/${action}.ejs`,
                target: `src/domain/useCases/${useCaseName}.js`,
                props: { 
                    name: { 
                        pascalCase: name,
                        camelCase: nameInCC
                    },
                    request: await generateRequest(schema)
                }
            })
            requires[nameInCC] = { ...requires[nameInCC], [`${action}`]: `require('./${useCaseName}.js')` }
        }
    }

    await generate({
        template: 'usecases/index.ejs',
        target: `src/domain/useCases/index.js`,
        props: { requires: requiresToString(requires) }
    })
}

