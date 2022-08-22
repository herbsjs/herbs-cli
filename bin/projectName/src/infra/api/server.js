const express = require('express')
const { herbsshelf } = require('@herbsjs/herbsshelf')
const { herbarium } = require('@herbsjs/herbarium')

const { graphql } = require('./graphql')
const { rest } = require('./rest')

function shelf(app, config) {

  app.get('/herbsshelf', (_, res) => {
    res.setHeader('Content-Type', 'text/html')
    const shelf = herbsshelf({ project: 'projectName', herbarium })
    res.write(shelf)
    res.end()
  })

  app.get("/", (req, res) => res.status(301).redirect("/herbsshelf"))

  // eslint-disable-next-line no-console
  console.info(`\n🌿 Herbs Shelf endpoint - /herbsshelf \n`)
}

async function start(config) {

  herbarium.requireAll()

  const app = express()
  await rest(app, config)
  await graphql(app, config)
  await shelf(app, config)

  return app.listen(
    { port: config.api.port },
    // eslint-disable-next-line no-console
    () => console.log(`🚀 Server UP and 🌪️  - http://localhost:${config.api.port}/`))
}

module.exports = { start }



