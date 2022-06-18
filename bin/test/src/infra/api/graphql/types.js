const { entity2type, entity2input } = require('@herbsjs/herbs2gql')
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
  const entitiesTypes = types.concat(entities.map(entity => [entity2type(entity)]))
  const entitiesInputs = types.concat(entities.map(entity => [entity2input(entity)]))

  /* Custom Types */
  // entitiesTypes.push(require('./custom/type'))
  // entitiesInputs.push(require('./custom/type'))

  return types.concat(entitiesTypes, entitiesInputs)
}

module.exports = types
