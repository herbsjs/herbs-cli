const merge = require('deepmerge')
const { usecase, step, Ok } = require('buchu')
const { Room } = require('../../entities')
const { NotValidError } = require('../../errors')

const useCase = ({ roomRepository }) => () =>
  usecase('Update Room', {
    // Input/Request metadata and validation 
    request: {
        id: Number,
        nickname: String,
        password: String
    },

    // Output/Response metadata
    response: Room,

    //Authorization with Audit
    // authorize: user => (user.canUpdateRoom ? Ok() : Err()),
    authorize: user => Ok(user),

    //Step description and function
    'Check if the Room is valid': step(async ctx => {
      const room = await roomRepository.findByID(parseInt(ctx.req.id))
      const newRoom = merge.all([ room, ctx.req ])
      ctx.room = Room.fromJSON(newRoom)

      if (!ctx.room.isValid()) return NotValidError('room', null, ctx.room.errors)
      // returning Ok continues to the next step. Err stops the use case execution.
      return Ok() 
    }),

    'Update the Room': step(async ctx => {
      // ctx.ret is the Use Case return
      return (ctx.ret = await roomRepository.update(ctx.room)) 
    })
  })

module.exports = useCase