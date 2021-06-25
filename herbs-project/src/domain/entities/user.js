const { entity, field } = require('gotu')

const User =
        entity('User', {
          id: field(Number),
          nickname: field(String),
          password: field(String)
        })

module.exports = User
