const { toLowCamelCase, objToString } = require('../../utils')

const errorCodes = {
    NotFound: {
        code: "NOT_FOUND",
        msg: "is not found"
    },
    NotValid: {
        code: "NOT_VALID",
        msg: "is not valid"
    }
}

module.exports = async ({ generate } ) => async () => {
    const requires = {}
    for (const error of Object.keys(errorCodes)) {
        await generate({
            template: `domain/errors/error.ejs`,
            target: `src/domain/errors/${toLowCamelCase(error)}.js`,
            props: { 
                name: error,
                code: errorCodes[error].code,
                defaultMsg: errorCodes[error].msg
            }
        })
        requires[`${error}Error`] = `require('./${toLowCamelCase(error)}.js')`
    }


    await generate({
        template: 'domain/errors/index.ejs',
        target: `src/domain/errors/index.js`,
        props: { requires: objToString(requires) }
    })
}
