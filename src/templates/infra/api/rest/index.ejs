const express = require('express')
const cors = require('cors')
const { json } = require('body-parser')
const { generateRoutes, generateControllers } = require('@herbsjs/herbs2rest')
const { herbarium } = require('@herbsjs/herbarium')
const controller = require('./controller')

async function rest(app, config) {

    // Request security
    app.use(json({ limit: '50mb' }))
    app.use(cors())

    const controllers = generateControllers({ herbarium, controller })

    // Add custom controllers
    // controllers.push({
    //     name: 'Search',
    //     post: {
    //         usecase: herbarium.usecases.get('SearchTask'),
    //         controller: searchController
    //     }
    // })

    const routes = new express.Router()
    const showEndpoints = !config.isProd
    generateRoutes(controllers, routes, showEndpoints)
    app.use(routes)
}

module.exports = { rest }