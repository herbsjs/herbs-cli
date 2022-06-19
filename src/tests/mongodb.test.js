/* globals describe, it, afterEach */

const { system } = require('gluegun')
const { expect } = require('chai')
const fs = require('fs')
const path = require('path')

const projectName = 'herbs-test-runner'

const generateProject = () => system.run(`herbs new --name ${projectName} --description "testing the herbs CLI"  --author herbs --license MIT --graphql --rest --database mongo --npmInstall yes`)

const npmInstall = () => system.run(`cd ${projectName} && npm install`)

describe('When I generate a complete project that uses mongodb', () => {
  afterEach(() => {
   fs.rmSync(path.resolve(process.cwd(), `${projectName}`), { recursive: true })
  })

  it('must exists a config/mongodb.js file', async () => {
    await generateProject()
    fs.readFileSync(path.resolve(process.cwd(), `${projectName}/src/infra/config/mongo.js`))
  })

  it('must contain the correct content', async () => {

    await generateProject()
    await npmInstall()
    
    const mongodbConfig = require(path.resolve(process.cwd(), `${projectName}/src/infra/config/mongo.js`))
    expect(mongodbConfig).to.deep.equal({
      connstr:'mongodb://localhost:27017',     
      dbName:'herbs-test-runner',
      herbsCLI: 'mongo'
    })
  })

  it('must to have connection file', async () => {
    await generateProject()
    fs.readFileSync(path.resolve(process.cwd(), `${projectName}/src/infra/data/database/connection.js`))  
  })
})

