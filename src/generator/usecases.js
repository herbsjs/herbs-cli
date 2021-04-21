const defaultValues = {
    String: '\'\'',
    Number: 100,
    Boolean: true,
    Date: new Date()
}

const useCases = ['create', 'update', 'delete']

async function getPropertiesStr(obj, spaces){
    //convert plain JSON and remove quotation marks(")
    const str = JSON.stringify(obj, null, spaces)
    .replaceAll('"', '')
    .split('\n')

    //remove first and last lines
    str.shift()
    str.pop()

    return str.join('\n').trim()
}
async function objToStr(schema, proType, spaces) {
    // schema to plain JSON
    const obj = Object.keys(schema).reduce((obj, key) => {
        const { name, type } = schema[key]
        if(proType === 'request') obj[name] = type.name || type.constructor.name;
        if(proType === 'example') obj[name] = defaultValues[type.name]
        return obj;
    }, {});
    return getPropertiesStr(obj, spaces)
}
async function propGenerator (schema){
    return {
        request: () => objToStr(schema, 'request', 6),
        example: () => objToStr(schema, 'example', 8)
    }
}

module.exports =  async ({ generate, filesystem }) => async () => {
    const entities = require(`${filesystem.cwd()}/src/domain/entities`)
    for(const entity of Object.keys(entities)){
        const { name, schema } = entities[entity].prototype.meta
        const props = await propGenerator(schema)
   
        for(const action of useCases){
            await generate({
                template: `usecases/${action}.ejs`,
                target: `src/domain/useCases/${action}${name}.js`,
                props: { 
                    name: { 
                        pascalCase: name,
                        camelCase: `${name[0].toLowerCase()}${name.slice(1)}`
                    },
                    request: await props.request(),
                    example: await props.example()
                }
            })
        }
    }
}

