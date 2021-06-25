const { usecase, step, Ok } = require('buchu')
const { Room } = require('../../entities')
const { NotFoundError } = require('../../errors')

const useCase = ({ roomRepository }) => () =>
  usecase('Find one Room', {
    // Input/Request metadata and validation 
    request: {
      id: Number,
    },

    // Output/Response metadata
    response: Room,

    //Authorization with Audit
    // authorize: user => (user.canFindOneRoom ? Ok() : Err()),
    authorize: user => Ok(user),

    'Update the Room': step(async ctx => {
      // ctx.ret is the Use Case return
      const [result] = await roomRepository.findByID(parseInt(ctx.req.id)) 
      if(!result) return NotFoundError('Room', `Room entity not found by id: ${ctx.req.id}`)
      return (ctx.ret = Room.fromJSON(result))
    })
  })

module.exports = useCase