const User = require('../../entities/user')
const findAllUser = require('./findAllUser')
const assert = require('assert')
const { spec, scenario, given, check, samples } = require('@herbsjs/herbs').specs
const { herbarium } = require('@herbsjs/herbarium')

const findAllUserSpec = spec({

    usecase: findAllUser,
  
    'Find all users': scenario({
      'Given an existing user': given({
        request: { limit: 0, offset: 0 },
        user: { hasAccess: true },
        injection: {
            UserRepository: class UserRepository {
              async findAll(id) { 
                  const fakeUser = {
                    id: 'a text',
        nickname: 'a text',
        registrationNumber: 99,
        password: 'a text'
                  }
                  return ([User.fromJSON(fakeUser)]) 
              }
            }
          },
      }),

      // when: default when for use case

      'Must run without errors': check((ctx) => {
        assert.ok(ctx.response.isOk)  
      }),

      'Must return a list of users': check((ctx) => {
        assert.strictEqual(ctx.response.ok.length, 1)
      })

    }),

  })
  
module.exports =
  herbarium.specs
    .add(findAllUserSpec, 'FindAllUserSpec')
    .metadata({ usecase: 'FindAllUser' })
    .spec