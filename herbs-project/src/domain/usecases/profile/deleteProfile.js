const { usecase, step, Ok } = require('buchu')

const useCase = ({ profileRepository }) => () =>
  usecase('Delete Profile', {
    // Input/Request metadata and validation 
    request: {
      id: Number
    },

    // Output/Response metadata
    response: Boolean,

    //Authorization with Audit
    // authorize: user => (user.canDeleteProfile ? Ok() : Err()),
    authorize: user => Ok(user),

    'Update the Profile': step(async ctx => {
      await profileRepository.deleteByID(parseInt(ctx.req.id))
      return Ok()
    })
  })

module.exports = useCase