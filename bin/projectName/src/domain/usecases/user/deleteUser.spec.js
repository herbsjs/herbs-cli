const User = require('../../entities/user')
const deleteUser = require('./deleteUser')
const assert = require('assert')
const { spec, scenario, given, check, samples } = require('@herbsjs/herbs').specs
const { herbarium } = require('@herbsjs/herbarium')

const deleteUserSpec = spec({

    usecase: deleteUser,
  
    'Delete user if exists': scenario({
      'Given an existing user': given({
        request: {
            id: 'a text'
        },
        user: { hasAccess: true },
        injection:{
            UserRepository: class UserRepository {
                async delete(entity) { return true }
                async findByID(id) { return [User.fromJSON({ id })] }            }
        },
      }),

      // when: default when for use case

      'Must run without errors': check((ctx) => {
        assert.ok(ctx.response.isOk)  
      }),

      'Must confirm deletion': check((ctx) => {
        assert.ok(ctx.response.ok === true)
      })

    }),

    'Do not delete user if it does not exist': scenario({
        'Given an empty user repository': given({
          request: {
              id: 'a text'
          },
          user: { hasAccess: true },
          injection:{
            UserRepository: class UserRepository {
              async findByID(id) { return [] }
            }
          },
        }),
  
        // when: default when for use case
  
        'Must return an error': check((ctx) => {
          assert.ok(ctx.response.isErr)
          assert.ok(ctx.response.isNotFoundError)  
        }),
      }),
  })
  
module.exports =
  herbarium.specs
    .add(deleteUserSpec, 'DeleteUserSpec')
    .metadata({ usecase: 'DeleteUser' })
    .spec