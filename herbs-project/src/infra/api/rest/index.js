const { json } = require('body-parser')
const { generateRoutes } = require('herbs2rest')
const cors = require('cors')
const express = require('express')
const renderShelfHTML = require('herbsshelf')
const usecases = require('../../../domain/usecases')
const db = require('../../../infra/data/database')
const repositoriesFactory = require('../../../infra/data/repositories')

function prepareUsecases(usecases){
    return Promise.all(usecases.map(uc => {
        const clonedUC = { ...uc}
        clonedUC.usecase = clonedUC.usecase({})()
        return clonedUC
    }))
}

async function prepareRoutes(config){
    const conn = await db.factory(config) 
    const repositories = await repositoriesFactory(conn)

    const routes = [
    {
        name: 'profiles',
        post: { usecase: require('../../../domain/usecases/profile/createProfile')(repositories) },
        update: { usecase: require('../../../domain/usecases/profile/updateProfile')(repositories) },
        delete: { usecase: require('../../../domain/usecases/profile/deleteProfile')(repositories) },
        get: { usecase: require('../../../domain/usecases/profile/findOneProfile')(repositories) }
    },
    {
        name: 'rooms',
        post: { usecase: require('../../../domain/usecases/room/createRoom')(repositories) },
        update: { usecase: require('../../../domain/usecases/room/updateRoom')(repositories) },
        delete: { usecase: require('../../../domain/usecases/room/deleteRoom')(repositories) },
        get: { usecase: require('../../../domain/usecases/room/findOneRoom')(repositories) }
    },
    {
        name: 'users',
        post: { usecase: require('../../../domain/usecases/user/createUser')(repositories) },
        update: { usecase: require('../../../domain/usecases/user/updateUser')(repositories) },
        delete: { usecase: require('../../../domain/usecases/user/deleteUser')(repositories) },
        get: { usecase: require('../../../domain/usecases/user/findOneUser')(repositories) }
    }
]
    
    return routes
}

module.exports = async (app, config) => {
    app.use(json({limit: '50mb'}))
    app.use(cors())

    const router = new express.Router()

    const verbose = !config.isProd
    const routes = await prepareRoutes(config)
    generateRoutes(routes, router, verbose)
    app.use(router)

    const ucs = await prepareUsecases(usecases)

    const shelf = renderShelfHTML(ucs)
    app.get('/herbsshelf', (_, res) => {
        res.setHeader('Content-Type', 'text/html')
        res.write(shelf)
        res.end()
    })
}