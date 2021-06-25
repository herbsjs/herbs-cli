const merge = require('deepmerge')
const { usecase, step, Ok } = require('buchu')
const { Profile } = require('../../entities')
const { NotValidError } = require('../../errors')

const useCase = ({ profileRepository }) => () =>
  usecase('Update Profile', {
    // Input/Request metadata and validation 
    request: {
        id: Number,
        nickname: String,
        password: String
    },

    // Output/Response metadata
    response: Profile,

    //Authorization with Audit
    // authorize: user => (user.canUpdateProfile ? Ok() : Err()),
    authorize: user => Ok(user),

    //Step description and function
    'Check if the Profile is valid': step(async ctx => {
      const profile = await profileRepository.findByID(parseInt(ctx.req.id))
      const newProfile = merge.all([ profile, ctx.req ])
      ctx.profile = Profile.fromJSON(newProfile)

      if (!ctx.profile.isValid()) return NotValidError('profile', null, ctx.profile.errors)
      // returning Ok continues to the next step. Err stops the use case execution.
      return Ok() 
    }),

    'Update the Profile': step(async ctx => {
      // ctx.ret is the Use Case return
      return (ctx.ret = await profileRepository.update(ctx.profile)) 
    })
  })

module.exports = useCase