const { usecase, step, Ok } = require('buchu')

const useCase = ({ roomRepository }) => () =>
  usecase('Delete Room', {
    // Input/Request metadata and validation 
    request: {
      id: Number
    },

    // Output/Response metadata
    response: Boolean,

    //Authorization with Audit
    // authorize: user => (user.canDeleteRoom ? Ok() : Err()),
    authorize: user => Ok(user),

    'Update the Room': step(async ctx => {
      await roomRepository.deleteByID(parseInt(ctx.req.id))
      return Ok()
    })
  })

module.exports = useCase