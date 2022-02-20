const { ApolloServer, gql } = require('apollo-server-express')
const types = require('./types')
const queries = require('./queries')
const mutations = require('./mutations')

async function graphql(app, config) {

    let graphQLDef = []
    graphQLDef = graphQLDef.concat(types(), queries(), mutations())

    /* Type Defs (Schemas) */
    const typeDefs = graphQLDef.map(i => gql(i[0]))

    /* Resolvers */
    const resolvers = graphQLDef.map(i => i[1]).filter(i => i !== undefined)

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
    server.applyMiddleware({ app: app, path: '/graphql' })

    // eslint-disable-next-line no-console
    console.info(`\n🔗 GraphQL endpoint - /graphql`)
}

module.exports = { graphql }