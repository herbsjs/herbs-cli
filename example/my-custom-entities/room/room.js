const { entity, field } = require('gotu')

const Room = 
        entity('Room',{
            nickname: field(String),
            password: field(String)
         })

const RoomInput = 
         entity('RoomInput',{
             nickname: field(String),
            password: field(String)
          })

module.exports = { Room, RoomInput }