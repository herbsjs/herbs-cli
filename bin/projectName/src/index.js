const server = require('./infra/api/server')
const config = require('./infra/config')

server.start(config)