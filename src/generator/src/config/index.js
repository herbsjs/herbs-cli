const { objToString } = require('../../utils')

module.exports =  async ({ generate, options}) => async () => {
    const requires = { 
        isProd: `env.is('production')`,
        api: `require('./api')`
    }

    await generate({
        template: 'config/api.ejs',
        target: `src/config/api.js`,
    })

    if(options.mongo){
        await generate({
            template: 'config/mongo.ejs',
            target: `src/config/mongo.js`,
            props: { dbName: options.name }
        })
        requires['database'] = `require('./mongo')` 
    }
    if(options.postgres){
        await generate({
            template: 'config/postgres.ejs',
            target: `src/config/postgres.js`,
        })
        requires['database'] = `require('./postgres')` 
    }

    await generate({
        template: 'config/index.ejs',
        target: `src/config/index.js`,
        props: { requires: objToString(requires) }
    })
}


