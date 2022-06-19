const env = require('sugar-env')
require('dotenv').config()

module.exports = {
  herbsCLI: 'mongo',
  dbName: env.get(`$MONGO_DATABASE`, 'test'),
  connstr: env.get(`$MONGO_CONN_STR`, 'mongodb://localhost:27017'),
}
