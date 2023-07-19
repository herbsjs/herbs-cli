const { UserInputError, ForbiddenError, ApolloError } = require('apollo-server-express')
const { args2request } = require('@herbsjs/herbs2gql')
const { logOK, logException } = require('../../log/api')

function resolver(usecase) {
    return async function resolver(_parent, args, context, _info) {
        let exception
        const user = context?.user
        try {
            const uc = usecase()

            /* Authorization */
            const hasAccess = await uc.authorize(user)
            if (hasAccess === false) {
                throw new ForbiddenError(`User is not authorized.`, { userId: user?.id, usecase: uc?.description })
            }

            /* Execution */
            const request = args2request(args, uc, _info)
            const response = await uc.run(request)

            /* Audit */
            // eslint-disable-next-line no-console
            // console.info(uc.auditTrail)

            /* Log */
            logOK({ uc, user, response, transport: 'GraphQL', endpoint: _info.fieldName })

            /* Response */
            if (response.isOk)
                return response.ok

            else if (response.isPermissionDeniedError)
                exception = new ForbiddenError(response.err.message, { cause: response.err })

            else if (response.isInvalidArgumentsError || response.isInvalidEntityError)
                exception = new UserInputError(response.err.message, { cause: response.err })

            else if (response.isNotFoundError || response.isAlreadyExistsError || response.isUnknownError)
                exception = new ApolloError(response.err.message, response.err.code, { cause: response.err })

            else
                exception = new UserInputError(null, { cause: response.err })
        } catch (error) {
            logException({ error, user, transport: 'GraphQL', endpoint: _info.fieldName })
            exception = error
        }
        if (exception) throw exception
    }
}

module.exports = resolver
