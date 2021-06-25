const { usecase, step, Ok } = require('buchu')
const { Profile } = require('../../entities')
const { NotFoundError } = require('../../errors')

const useCase = ({ profileRepository }) => () =>
  usecase('Find one Profile', {
    // Input/Request metadata and validation 
    request: {
      id: Number,
    },

    // Output/Response metadata
    response: Profile,

    //Authorization with Audit
    // authorize: user => (user.canFindOneProfile ? Ok() : Err()),
    authorize: user => Ok(user),

    'Update the Profile': step(async ctx => {
      // ctx.ret is the Use Case return
      const [result] = await profileRepository.findByID(parseInt(ctx.req.id)) 
      if(!result) return NotFoundError('Profile', `Profile entity not found by id: ${ctx.req.id}`)
      return (ctx.ret = Profile.fromJSON(result))
    })
  })

module.exports = useCase