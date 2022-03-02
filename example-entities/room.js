const { entity, id, field } = require('@herbsjs/herbs')

const Room =
        entity('Room', {
          id: id(Number),
          nickname: field(String),
          password: field(String)
        })
module.exports = Room
