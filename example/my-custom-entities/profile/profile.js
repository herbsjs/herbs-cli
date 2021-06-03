const { entity, field } = require('gotu')

const Profile = 
        entity('Profile',{
            nickname: field(String),
            password: field(String)
         })


module.exports = Profile
