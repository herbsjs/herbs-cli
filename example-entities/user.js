const { entity, id, field } = require('@herbsjs/herbs')

const User =
        entity('User', {
          id: id(Number),
          nickname: field(String),
          password: field(String)
        })

module.exports = User
