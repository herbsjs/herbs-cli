const { entity, field } = require('@herbsjs/herbs')

const Room =
        entity('Room', {
          id: field(Number),
          nickname: field(String),
          password: field(String)
        })
module.exports = Room
