const { entity, field } = require('@herbsjs/herbs')

const Profile =
        entity('Profile', {
          id: field(Number),
          nickname: field(String),
          password: field(String)
        })

module.exports = Profile
