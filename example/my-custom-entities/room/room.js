const { entity, field } = require('gotu')

const Room = 
        entity('Room',{
            nickname: field(String),
            password: field(String)
         })
module.exports = Room