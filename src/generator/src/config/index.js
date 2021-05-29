const { objToString } = require('../../utils')

module.exports =  async ({ generate, options }) => async () => {
    const requires = { 
        isProd: `env.is('production')`,
    }

    await generate({
        template: 'config/api.ejs',
        target: `src/config/api.js`,
    })

    if(options.mongo){
        await generate({
            template: 'config/mongo.ejs',
            target: `src/config/mongo.js`,
            props: { dbName: 'TODOmUDAR'}
        })
        requires['mongo'] = `require('./mongo')` 
    }

    await generate({
        template: 'config/index.ejs',
        target: `src/config/index.js`,
        props: { requires: objToString(requires) }
    })
}


