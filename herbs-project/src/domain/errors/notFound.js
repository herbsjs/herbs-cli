const { Err } = require('buchu')

const defaultMsg  = (entityName) => `${entityName} is not found`

function NotFoundError (entityName, message, stackTrace) {
  return Err({ 
    code: `${entityName}_NOT_FOUND`.toUpperCase(),
    message: message || defaultMsg(entityName), 
    stackTrace 
  })
}

module.exports = NotFoundError
module.exports.NotFoundError = NotFoundError
