const { usecase, step, Ok } = require('buchu')
const { User } = require('../../entities')
const { NotFoundError } = require('../../errors')

const useCase = ({ userRepository }) => () =>
  usecase('Find one User', {
    // Input/Request metadata and validation 
    request: {
      id: Number,
    },

    // Output/Response metadata
    response: User,

    //Authorization with Audit
    // authorize: user => (user.canFindOneUser ? Ok() : Err()),
    authorize: user => Ok(user),

    'Update the User': step(async ctx => {
      // ctx.ret is the Use Case return
      const [result] = await userRepository.findByID(parseInt(ctx.req.id)) 
      if(!result) return NotFoundError('User', `User entity not found by id: ${ctx.req.id}`)
      return (ctx.ret = User.fromJSON(result))
    })
  })

module.exports = useCase