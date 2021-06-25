const { Err } = require('buchu')

const defaultMsg  = (entityName) => `${entityName} is not valid`

function NotValidError (entityName, message, stackTrace) {
  return Err({ 
    code: `${entityName}_NOT_VALID`.toUpperCase(),
    message: message || defaultMsg(entityName), 
    stackTrace 
  })
}

module.exports = NotValidError
module.exports.NotValidError = NotValidError
