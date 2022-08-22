const { usecase, step, Ok, Err, request } = require('@herbsjs/herbs')
const { herbarium } = require('@herbsjs/herbarium')
const User = require('../../entities/user')
const UserRepository = require('../../../infra/data/repositories/userRepository')

const dependency = { UserRepository }

const createUser = injection =>
  usecase('Create User', {
    // Input/Request metadata and validation 
    request: request.from(User, { ignoreIDs: true }),

    // Output/Response metadata
    response: User,

    //Authorization with Audit
    // authorize: (user) => (user.canCreateUser ? Ok() : Err()),
    authorize: () => Ok(),

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    //Step description and function
    'Check if the User is valid': step(ctx => {
      ctx.user = User.fromJSON(ctx.req)
      ctx.user.id = Math.floor(Math.random() * 100000).toString()
      
      if (!ctx.user.isValid()) 
        return Err.invalidEntity({
          message: 'The User entity is invalid', 
          payload: { entity: 'User' },
          cause: ctx.user.errors 
        })

      // returning Ok continues to the next step. Err stops the use case execution.
      return Ok() 
    }),

    'Save the User': step(async ctx => {
      const repo = new ctx.di.UserRepository(injection)
      const user = ctx.user
      // ctx.ret is the return value of a use case
      return (ctx.ret = await repo.insert(user))
    })
  })

module.exports =
  herbarium.usecases
    .add(createUser, 'CreateUser')
    .metadata({ group: 'User', operation: herbarium.crud.create, entity: User })
    .usecase