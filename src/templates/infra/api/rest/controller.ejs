/* eslint-disable no-unused-vars */
const { req2request } = require('@herbsjs/herbs2rest')

const controller = async (uc, req, user, res, next) => {
    try {
        const usecase = uc()

        /* Authorization */
        const hasAccess = await usecase.authorize(user)
        if (hasAccess === false) {
            // eslint-disable-next-line no-console
            console.info(usecase.auditTrail)
            return res.status(403).json({ message: 'User is not authorized' })
        }

        /* Execution */
        const request = req2request(req, usecase)
        const response = await usecase.run(request)

        /* Audit */
        // eslint-disable-next-line no-console
        console.info(usecase.auditTrail)

        /* Response */
        if (response.isOk) {
            // OK
            res.status(200).json(response.ok)
        }
        else {
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
        res.status(500).json({ error: error.name, message: error.message })
        next()
    }
}

module.exports = controller