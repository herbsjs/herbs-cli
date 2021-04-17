const { plainObjToStr }  = require('../utils')

// TODO: support custom types
const defaultValues = {
    String: '\'\'',
    Number: 100,
    Boolean: true,
    Date: new Date()
}

const propGenerate = async (schema) => {
    return {
        request: async () => {
            // schema to plain JSON
            const obj = Object.keys(schema).reduce((obj, key) => {
                const { name, type } = schema[key]
                obj[name] = type.name || type.constructor.name;
                return obj;
            }, {});
            return plainObjToStr(obj, 6)
        },
        example: async () => {
            const example = Object.keys(schema).reduce((obj, key) => {
                const { name, type } = schema[key]
                obj[name] = defaultValues[type.name]
                return obj;
            }, {});
            return plainObjToStr(example, 8)
        }
    }
}

module.exports = { propGenerate }