const { entity, field } = require('gotu')

const User = 
        entity('User',{
            nickname: field(String),
            password: field(String)
         })

const UserInput = 
         entity('UserInput',{
             nickname: field(String),
             password: field(String)
          })

module.exports = { User, UserInput }