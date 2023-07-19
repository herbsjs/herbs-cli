const { logOK, logException } = require('../../log/api')

const controller = async ({ usecase, request, authorizationInfo, req, res, next, path, method }) => {
    const user = authorizationInfo

    try {
        const uc = usecase()

        /* Authorization */
        const hasAccess = await uc.authorize(user)
        if (hasAccess === false) {
            const errorMsg = `User is not authorized.`
            logException({ uc, user, error: errorMsg, transport: 'REST', endpoint: `${method} ${path}` })
            return res.status(403).json({ message: errorMsg, userId: user?.id, usecase: uc?.description })
        }

        /* Execution */
        const response = await uc.run(request)

        /* Audit */
        // eslint-disable-next-line no-console
        // console.info(uc.auditTrail)

        /* Log */
        logOK({ uc, user, response, transport: 'REST', endpoint: `${method} ${path}` })

        /* Response */
        if (response.isOk) {
            // OK
            res.status(200).json(response.ok)
        } else {
            // Err
            let status = 400
            if (response.isInvalidArgumentsError) status = 400
            if (response.isPermissionDeniedError) status = 403
            if (response.isNotFoundError) status = 404
            if (response.isAlreadyExistsError) status = 409
            if (response.isInvalidEntityError) status = 422
            if (response.isUnknownError) status = 500
            res.status(status).json({ error: response.err })
        }
        res.end()
    } catch (error) {
        logException({ error, user, transport: 'REST', endpoint: `${method} ${path}` })
        res.status(500).json({ error: error.name, message: error.message })
        next()
    }
}

module.exports = controller
