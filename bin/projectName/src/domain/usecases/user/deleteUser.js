const { usecase, step, Ok, Err } = require('@herbsjs/herbs')
const { herbarium } = require('@herbsjs/herbarium')
const User = require('../../entities/user')
const UserRepository = require('../../../infra/data/repositories/userRepository')

const dependency = { UserRepository }

const deleteUser = injection =>
  usecase('Delete User', {
    // Input/Request metadata and validation 
    request: {
      id: String
    },

    // Output/Response metadata
    response: Boolean,

    //Authorization with Audit
    // authorize: (user) => (user.canDeleteUser ? Ok() : Err()),
    authorize: () => Ok(),

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    'Check if the User exist': step(async ctx => {
      const repo = new ctx.di.UserRepository(injection)
      const [user] = await repo.findByID(ctx.req.id)
      ctx.user = user

      if (user) return Ok()
      return Err.notFound({
          message: `User ID ${ctx.req.id} does not exist`,
          payload: { entity: 'User' }
      })
    }),

    'Delete the User': step(async ctx => {
      const repo = new ctx.di.UserRepository(injection)
      ctx.ret = await repo.delete(ctx.user)
      // ctx.ret is the return value of a use case
      return Ok(ctx.ret)
    })
  })

module.exports =
  herbarium.usecases
    .add(deleteUser, 'DeleteUser')
    .metadata({ group: 'User', operation: herbarium.crud.delete, entity: User })
    .usecase