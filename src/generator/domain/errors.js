const { toLowCamelCase, requiresToString } = require('../utils')

const errorCodes = {
    "NotFound": "NOT_FOUND",
    "NotValid": "NOT_VALID"
}
let entities = ["User"]

module.exports = async ({ generate, options } ) => async () => {
    if (options.entities){
        // TODO: BUILD CUSTOM ENTITIES
    }
    const requires = {}
    for(const entity of entities){
        const name = toLowCamelCase(entity)

        for (const error of Object.keys(errorCodes)) {
            const code = `${name.toUpperCase()}_${errorCodes[error]}`
            const errorName = `${name}${error}`
            requires[name] = { ...requires[name], [`${toLowCamelCase(error)}`]: `require('./${errorName}.js')` }

            await generate({
                template: `domain/errors/error.ejs`,
                target: `src/domain/errors/${errorName}.js`,
                props: { name: errorName, code }
            })
        }
    }

    await generate({
        template: 'domain/errors/index.ejs',
        target: `src/domain/errors/index.js`,
        props: { requires: requiresToString(requires) }
    })
}
