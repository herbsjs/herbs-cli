const merge = require('deepmerge')
const { usecase, step, Ok } = require('buchu')
const { User } = require('../../entities')
const { NotValidError } = require('../../errors')

const useCase = ({ userRepository }) => () =>
  usecase('Update User', {
    // Input/Request metadata and validation 
    request: {
        id: Number,
        nickname: String,
        password: String
    },

    // Output/Response metadata
    response: User,

    //Authorization with Audit
    // authorize: user => (user.canUpdateUser ? Ok() : Err()),
    authorize: user => Ok(user),

    //Step description and function
    'Check if the User is valid': step(async ctx => {
      const user = await userRepository.findByID(parseInt(ctx.req.id))
      const newUser = merge.all([ user, ctx.req ])
      ctx.user = User.fromJSON(newUser)

      if (!ctx.user.isValid()) return NotValidError('user', null, ctx.user.errors)
      // returning Ok continues to the next step. Err stops the use case execution.
      return Ok() 
    }),

    'Update the User': step(async ctx => {
      // ctx.ret is the Use Case return
      return (ctx.ret = await userRepository.update(ctx.user)) 
    })
  })

module.exports = useCase