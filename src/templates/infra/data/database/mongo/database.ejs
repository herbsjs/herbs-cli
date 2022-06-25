const { MongoClient } = require('mongodb')
const config = require('../../config')

let dbInstance = null;

module.exports = async () => {
        if (dbInstance) {
            return new Promise((resolve) => resolve(dbInstance))
        }
        const client = await new MongoClient(config.database.connstr)
        await client.connect()
        dbInstance = client.db(config.database.dbName)
        return dbInstance
}