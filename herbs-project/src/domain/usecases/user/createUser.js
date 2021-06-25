const { usecase, step, Ok } = require('buchu')
const { User } = require('../../entities')
const { UserNotValidError } = require('../../errors')

const useCase = ({ userRepository }) => () =>
  usecase('Create User', {
    // Input/Request metadata and validation 
    request: {
        nickname: String,
        password: String
    },


    // Output/Response metadata
    response: User,

    //Authorization with Audit
    // authorize: user => (user.canCreateUser ? Ok() : Err()),
    authorize: user => Ok(user),

    //Step description and function
    'Check if the User is valid': step(ctx => {
      ctx.user = User.fromJSON(ctx.req)

      if (!ctx.user.isValid()) 
        return UserNotValidError('User ', 'The User entity is invalid', ctx.user.errors)
      // returning Ok continues to the next step. Err stops the use case execution.
      return Ok() 
    }),

    'Save the User': step(async ctx => {
      // ctx.ret is the Use Case return
      return (ctx.ret = await userRepository.insert(ctx.user)) 
    })
  })

module.exports = useCase