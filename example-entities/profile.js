const { entity, id,field } = require('@herbsjs/herbs')

const Profile =
        entity('Profile', {
          id: id(Number),
          nickname: field(String),
          password: field(String)
        })

module.exports = Profile
