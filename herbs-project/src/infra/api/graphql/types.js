const { entity2type } = require('herbs2gql')
const entities = require('../../../domain/entities')

const defaultSchema = [`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }`]

const types = [defaultSchema].concat(Object
                                .keys(entities)
                                .map(entity => [entity2type(entities[entity])]))

module.exports = types