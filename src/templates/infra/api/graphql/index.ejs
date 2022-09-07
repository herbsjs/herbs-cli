const { ApolloServer, gql } = require('apollo-server-express')
const { herbs2gql } = require('@herbsjs/herbs2gql')
const { herbarium } = require('@herbsjs/herbarium')
const resolver = require('./resolver')

async function graphql(app, config) {
  const { types, queries, mutations } = herbs2gql({ herbarium, resolver })
  /* types, queries, mutations can receive custom types like:
        queries.push(require('./custom/getItem'))
        mutations.push(require('./custom/createItem'))
        types.push(require('./custom/Item'))
    */
  types.push(require('./custom/date'))

  /* Default Schemas */
  types.unshift([
    `
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }`,
  ])

  let graphQLDef = [].concat(types, queries, mutations)
  graphQLDef = graphQLDef.concat(types, queries, mutations)

  /* Type Defs (Schemas) */
  const typeDefs = graphQLDef.map((i) => gql(i[0]))

  /* Resolvers */
  const resolvers = graphQLDef.map((i) => i[1]).filter((i) => i !== undefined)

  /* Server */
  const server = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs,
    resolvers,
    // Authorization
    // context: ({ req }) => ({ user })
  })
  await server.start()
  server.applyMiddleware({ app: app, path: config.api.graphql.rootPath })

  // eslint-disable-next-line no-console
  console.info(`\n🔗 GraphQL endpoint - ${config.api.graphql.rootPath}`)
}

module.exports = { graphql }
