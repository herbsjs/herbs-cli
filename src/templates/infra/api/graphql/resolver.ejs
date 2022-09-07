const { UserInputError, ForbiddenError, ApolloError } = require('apollo-server-express')
const { args2request } = require('@herbsjs/herbs2gql')

function resolver(uc) {

    return async function resolver(_parent, args, context, _info) {

        const usecase = uc()

        /* Authorization */
        const hasAccess = await usecase.authorize(context.user)
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
        if (response.isErr) {
            if (response.isPermissionDeniedError)
                throw new ForbiddenError(response.err.message, { cause: response.err })

            if (response.isInvalidArgumentsError ||
                response.isInvalidEntityError)
                throw new UserInputError(response.err.message, { cause: response.err })

            if (response.isNotFoundError ||
                response.isAlreadyExistsError ||
                response.isUnknownError)
                throw new ApolloError(response.err.message, response.err.code, { cause: response.err })

            throw new UserInputError(null, { cause: response.err })
        }

        return response.ok
    }
}

module.exports = resolver
