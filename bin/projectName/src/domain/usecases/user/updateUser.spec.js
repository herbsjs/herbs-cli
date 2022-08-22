const User = require('../../entities/user')
const updateUser = require('./updateUser')
const assert = require('assert')
const { spec, scenario, given, check, samples } = require('@herbsjs/herbs').specs
const { herbarium } = require('@herbsjs/herbarium')

const updateUserSpec = spec({

    usecase: updateUser,
    'Update a existing user when it is valid': scenario({

      'Valid users': samples([
        {
          id: 'a text',
        nickname: 'a text',
        registrationNumber: 99,
        password: 'a text'
        },
        {
          id: 'a text',
        nickname: 'a text',
        registrationNumber: 99,
        password: 'a text'
        }
      ]),
      
      'Valid users': samples([
        {
          id: 'a text',
        nickname: 'a text',
        registrationNumber: 99,
        password: 'a text'
        },
        {
          id: 'a text',
        nickname: 'a text',
        registrationNumber: 99,
        password: 'a text'
        }
      ]),

      'Given a valid user': given((ctx) => ({
        request: ctx.sample,
        user: { hasAccess: true }
      })),

      'Given a repository with a existing user': given((ctx) => ({
        injection: {
            UserRepository: class UserRepository {
              async findByID(id) { 
                const fakeUser = {
                    id: 'a text',
        nickname: 'a text',
        registrationNumber: 99,
        password: 'a text'
                }
                return ([User.fromJSON(fakeUser)])              }
              async update(id) { return true }
            }
          },
      })),

      // when: default when for use case

      'Must run without errors': check((ctx) => {
        assert.ok(ctx.response.isOk)  
      }),

      'Must confirm update': check((ctx) => {
        assert.ok(ctx.response.ok === true)
      })

    }),

    'Do not update a user when it is invalid': scenario({
      'Given a invalid user': given({
        request: {
          id: true,
        nickname: true,
        registrationNumber: true,
        password: true
        },
        user: { hasAccess: true },
        injection: {},
      }),

      // when: default when for use case

      'Must return an error': check((ctx) => {
        assert.ok(ctx.response.isErr)  
        // assert.ok(ctx.response.isInvalidEntityError)
      }),

    }),

    'Do not update user if it does not exist': scenario({
        'Given an empty user repository': given({
          request: {
              id: 'a text',
        nickname: 'a text',
        registrationNumber: 99,
        password: 'a text'
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
    .add(updateUserSpec, 'UpdateUserSpec')
    .metadata({ usecase: 'UpdateUser' })
    .spec