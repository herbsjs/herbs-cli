const createUser = require('./createUser')
const assert = require('assert')
const { spec, scenario, given, check, samples } = require('@herbsjs/herbs').specs
const { herbarium } = require('@herbsjs/herbarium')

const createUserSpec = spec({

    usecase: createUser,
  
    'Create a new user when it is valid': scenario({
      'Given a valid user': given({
        request: {
            nickname: 'a text',
        registrationNumber: 99,
        password: 'a text'
        },
        user: { hasAccess: true },
        injection: {
            UserRepository: class UserRepository {
              async insert(user) { return (user) }
            }
        },
      }),

      // when: default when for use case

      'Must run without errors': check((ctx) => {
        assert.ok(ctx.response.isOk)  
      }),

      'Must return a valid user': check((ctx) => {
        assert.strictEqual(ctx.response.ok.isValid(), true)
        // TODO: check if it is really a user
      })

    }),

    'Do not create a new user when it is invalid': scenario({
      'Given a invalid user': given({
        request: {
          nickname: true,
        registrationNumber: true,
        password: true
        },
        user: { hasAccess: true },
        injection: {
            userRepository: new ( class UserRepository {
              async insert(user) { return (user) }
            })
        },
      }),

      // when: default when for use case

      'Must return an error': check((ctx) => {
        assert.ok(ctx.response.isErr)  
        // assert.ok(ret.isInvalidEntityError)
      }),

    }),
  })
  
module.exports =
  herbarium.specs
    .add(createUserSpec, 'CreateUserSpec')
    .metadata({ usecase: 'CreateUser' })
    .spec