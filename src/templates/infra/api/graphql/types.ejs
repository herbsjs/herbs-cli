const { entity2type } = require('@herbsjs/herbs2gql')
const { herbarium } = require('@herbsjs/herbarium')
const { GraphQLDateTime } = require('graphql-scalars')

function types() {

  const defaultSchema = [`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }`]

  let types = [defaultSchema]

  /* Date Types */
  const resolver = { Date: GraphQLDateTime }
  const schema = [`scalar Date`]
  types.push([schema, resolver])

  /* Domain Types */
  const entities = Array.from(herbarium.entities.all.values()).map(e => e.entity)
  types = types.concat(entities.map(entity => [entity2type(entity)]))

  /* Custom Types */
  // types.push(require('./custom/type'))

  return types
}

module.exports = types
