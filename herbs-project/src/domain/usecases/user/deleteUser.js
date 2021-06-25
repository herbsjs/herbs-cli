const { usecase, step, Ok } = require('buchu')

const useCase = ({ userRepository }) => () =>
  usecase('Delete User', {
    // Input/Request metadata and validation 
    request: {
      id: Number
    },

    // Output/Response metadata
    response: Boolean,

    //Authorization with Audit
    // authorize: user => (user.canDeleteUser ? Ok() : Err()),
    authorize: user => Ok(user),

    'Update the User': step(async ctx => {
      await userRepository.deleteByID(parseInt(ctx.req.id))
      return Ok()
    })
  })

module.exports = useCase