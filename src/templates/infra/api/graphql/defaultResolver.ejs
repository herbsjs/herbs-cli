const { UserInputError, ForbiddenError } = require('apollo-server-express')

function args2request(args, useCase) {
    const params = {}
    const fields = Object.keys(useCase.requestSchema)
    for (const field of fields) params[field] = args[field]
    return params
}

function defaultResolver(usecase) {

    return async function resolver(parent, args, context, info) {

        /* Authorization */
        const hasAccess = usecase.authorize(context.user)
        if (hasAccess === false) {
            // eslint-disable-next-line no-console
            console.info(usecase.auditTrail)
            throw new ForbiddenError()
        }

        /* Execution */
        const request = args2request(args, usecase)
        const response = await usecase.run(request)

        /* Audit */
        // eslint-disable-next-line no-console
        console.info(usecase.auditTrail)

        /* Response */
        if (response.isErr) throw new UserInputError(null, { invalidArgs: response.err })
        return response.ok
    }
}

module.exports = defaultResolver
