const { usecase, step, Ok, Err, request } = require('@herbsjs/herbs')
const { herbarium } = require('@herbsjs/herbarium')
const merge = require('deepmerge')
const User = require('../../entities/user')
const UserRepository = require('../../../infra/data/repositories/userRepository')

const dependency = { UserRepository }

const updateUser = injection =>
  usecase('Update User', {
    // Input/Request metadata and validation 
    request: request.from(User),

    // Output/Response metadata
    response: User,

    //Authorization with Audit
    // authorize: (user) => (user.canUpdateUser ? Ok() : Err()),
    authorize: () => Ok(),

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    'Retrieve the User': step(async ctx => {
      const id = ctx.req.id
      const repo = new ctx.di.UserRepository(injection)
      const [user] = await repo.findByID(id)
      ctx.user = user
      if (user === undefined) return Err.notFound({
        message: `User not found - ID: ${id}`,
        payload: { entity: 'User' }
      })

      return Ok(user)
    }),

    'Check if it is a valid User before update': step(ctx => {
      const oldUser = ctx.user
      const newUser = User.fromJSON(merge.all([ oldUser, ctx.req ]))
      ctx.user = newUser

      return newUser.isValid() ? Ok() : Err.invalidEntity({
        message: `User is invalid`,
        payload: { entity: 'User' },
        cause: newUser.errors
      })

    }),

    'Update the User': step(async ctx => {
      const repo = new ctx.di.UserRepository(injection)
      // ctx.ret is the return value of a use case
      return (ctx.ret = await repo.update(ctx.user))
    })

  })

module.exports =
  herbarium.usecases
    .add(updateUser, 'UpdateUser')
    .metadata({ group: 'User', operation: herbarium.crud.update, entity: User })
    .usecase