const { entity, field } = require('@herbsjs/herbs')

const User =
        entity('User', {
          id: field(Number),
          nickname: field(String),
          password: field(String)
        })

module.exports = User
