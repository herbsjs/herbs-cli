const { objToStr }  = require('./utils')

const exampleValues = {
    String: '\'\'',
    Number: 100,
    Boolean: true,
    Date: new Date()
}

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
                obj[name] = exampleValues[type.name]
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
        await generate({
            template: 'usecases/useCase.ejs',
            target: `src/domain/useCases/create${name}.js`,
            props: { 
                entity: name,
                request: await props.request(),
                lowerCaseEntity: name.toLowerCase(),
                example: await props.example()
            },
        })
    }
}

