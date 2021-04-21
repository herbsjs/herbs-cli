const { objToStr }  = require('./utils')

const defaultValues = {
    String: '\'\'',
    Number: 100,
    Boolean: true,
    Date: new Date()
}

const useCases = ['create', 'update']

const propGenerator = async (schema) => {
    return {
        request: async () => {
            // schema to plain JSON
            const obj = Object.keys(schema).reduce((obj, key) => {
                const { name, type } = schema[key]
                obj[name] = type.name || type.constructor.name;
                return obj;
            }, {});
            return objToStr(obj, 6)
        },
        example: async () => {
            // schema to example filled plain JSON
            const example = Object.keys(schema).reduce((obj, key) => {
                const { name, type } = schema[key]
                obj[name] = defaultValues[type.name]
                return obj;
            }, {});
            return objToStr(example, 8)
        }
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

