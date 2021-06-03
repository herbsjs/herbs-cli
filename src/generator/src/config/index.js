const { objToString } = require('../../utils')

module.exports =  async ({ generate, options: { mongo = false, postgres = false} }) => async () => {
    const requires = { 
        isProd: `env.is('production')`,
        api: `require('./api')`
    }

    await generate({
        template: 'config/api.ejs',
        target: `src/config/api.js`,
    })

    if(mongo){
        await generate({
            template: 'config/mongo.ejs',
            target: `src/config/mongo.js`,
            props: { dbName: 'TODOmUDAR'}
        })
        requires['database'] = `require('./mongo')` 
    }
    if(postgres){
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


