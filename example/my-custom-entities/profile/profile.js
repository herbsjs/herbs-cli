const { entity, field } = require('gotu')

const Profile = 
        entity('Profile',{
            nickname: field(String),
            password: field(String)
         })

const ProfileInput = 
         entity('ProfileInput',{
             nickname: field(String),
            password: field(String)
          })

module.exports = { Profile, ProfileInput }
