const { usecase, step, Ok } = require('buchu')
const { Profile } = require('../../entities')
const { ProfileNotValidError } = require('../../errors')

const useCase = ({ profileRepository }) => () =>
  usecase('Create Profile', {
    // Input/Request metadata and validation 
    request: {
        nickname: String,
        password: String
    },


    // Output/Response metadata
    response: Profile,

    //Authorization with Audit
    // authorize: user => (user.canCreateProfile ? Ok() : Err()),
    authorize: user => Ok(user),

    //Step description and function
    'Check if the Profile is valid': step(ctx => {
      ctx.profile = Profile.fromJSON(ctx.req)

      if (!ctx.profile.isValid()) 
        return ProfileNotValidError('Profile ', 'The Profile entity is invalid', ctx.profile.errors)
      // returning Ok continues to the next step. Err stops the use case execution.
      return Ok() 
    }),

    'Save the Profile': step(async ctx => {
      // ctx.ret is the Use Case return
      return (ctx.ret = await profileRepository.insert(ctx.profile)) 
    })
  })

module.exports = useCase