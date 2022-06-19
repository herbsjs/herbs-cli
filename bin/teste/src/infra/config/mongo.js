const env = require('sugar-env')
require('dotenv').config()


module.exports = {
  herbsCLI: 'mongo',
  dbName: env.get(`$MONGO_DATABASE`, 'teste'),
  connstr: env.get(`$MONGO_CONN_STR`, 'mongodb://jhonathan:e296cd9f@localhost:27017'),
}
