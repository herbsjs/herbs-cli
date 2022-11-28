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

    const routes = new express.Router()

    herbs2rest({ routes, config })

    app.use(routes)
}

function herbs2rest({ routes, config }) {

    // Herbs to REST will populate the Express routes and controllers 
    // based on your entities and use cases.

    // 1. Prepare Routes and Controllers
    // Firts, it will pre-generate all routes for your use cases 
    // using the default controller implementation. 
    // Later, you will have the opportunity to customize it.
    const controllers = generateControllers({ herbarium, controller })

    // 2. Add Custom Route and Controller
    // controllers.push({
    //     name: 'Search',
    //     post: {
    //         usecase: herbarium.usecases.get('SearchUsers').usecase,
    //         controller: searchController
    //     }
    // })

    // 3. Or Edit Default Controllers 
    // const userControllers = controllers.find((ctrl) => ctrl.name === 'User')
    // userControllers.delete.controller = async (uc, req, user, res, next) => res.status(200).end()

    // 4. Apply Routes and Controllers to Express
    const showEndpoints = !config.isProd
    generateRoutes(controllers, routes, showEndpoints)
}

module.exports = { rest }