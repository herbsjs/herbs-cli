const { entity, field } = require('gotu')

const Room =
        entity('Room', {
          id: field(Number),
          nickname: field(String),
          password: field(String)
        })
module.exports = Room
