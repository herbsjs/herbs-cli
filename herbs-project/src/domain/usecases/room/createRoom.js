const { usecase, step, Ok } = require('buchu')
const { Room } = require('../../entities')
const { RoomNotValidError } = require('../../errors')

const useCase = ({ roomRepository }) => () =>
  usecase('Create Room', {
    // Input/Request metadata and validation 
    request: {
        nickname: String,
        password: String
    },


    // Output/Response metadata
    response: Room,

    //Authorization with Audit
    // authorize: user => (user.canCreateRoom ? Ok() : Err()),
    authorize: user => Ok(user),

    //Step description and function
    'Check if the Room is valid': step(ctx => {
      ctx.room = Room.fromJSON(ctx.req)

      if (!ctx.room.isValid()) 
        return RoomNotValidError('Room ', 'The Room entity is invalid', ctx.room.errors)
      // returning Ok continues to the next step. Err stops the use case execution.
      return Ok() 
    }),

    'Save the Room': step(async ctx => {
      // ctx.ret is the Use Case return
      return (ctx.ret = await roomRepository.insert(ctx.room)) 
    })
  })

module.exports = useCase