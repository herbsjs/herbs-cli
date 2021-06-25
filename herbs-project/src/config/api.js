const env = require('sugar-env')
require('dotenv').config()

module.exports = {
  port: env.get(['GRAPHQL_PORT', 'API_PORT'], 3000),
  host: env.get(['GRAPHQL_HOST', 'API_HOST'], '0.0.0.0'),
  graphql: { // TODO:  remove it if not necessary
    rootPath: env.get(['GRAPHQL_ROOT_PATH', 'GRAPHQL_PATH', 'GRAPHL_ROOT'], '/graphql')
  }
}
