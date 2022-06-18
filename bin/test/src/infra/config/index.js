const env = require('sugar-env')
require('dotenv').config()

module.exports = {
    isProd: env.is('production'),
    api: require('./api'),
    database: require('./postgres')
}
