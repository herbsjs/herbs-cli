/* globals describe, it, afterEach */

const { system } = require('gluegun')
const { expect } = require('chai')
const fs = require('fs')
const path = require('path')

const projectName = 'herbs-test-runner'

const linknpm = () => system.run(`cd bin && npm link --force`)

const generateProject = () => system.run(`herbs new --name ${projectName} --description "testing the herbs CLI"  --author herbs --license MIT --graphql --rest no --database postgres --npmInstall yes`)
const callHerbsCli = () => system.run(`herbs -v && herbs`)

const herbsUpdate = () => system.run(`cd ${projectName} && herbs update`)

describe('When I generate a complete project that uses postgres', () => {

  it('must link npm herbs', async () => {
      await linknpm()
      await callHerbsCli()
  })

  it('Should I create a new entity with foreign key', async () => {
    await generateProject()
    const customerEntity = 
    `
    const { entity, id, field } = require('@herbsjs/herbs')
    const { herbarium } = require('@herbsjs/herbarium')
    const User = require('./user')
    
    const Customer =
            entity('Customer', {
              id: id(String),
              description: field(String),
              user: field(User)
            })
    
    module.exports =
      herbarium.entities
        .add(Customer, 'Customer')
        .entity
    `

    const dir = `${path.resolve(process.cwd(), `${projectName}/src/domain/entities/customer.js`)}`
    fs.writeFileSync(dir, customerEntity)
    expect(fs.existsSync(dir)).to.be.true
  })

  it('I hope to have a repository file for Customer entity after running Herbs Update', async () => {
    await herbsUpdate()
    expect(fs.existsSync(path.resolve(process.cwd(), `${projectName}/src/infra/data/repositories/customerRepository.js`))).to.be.true
  })
})

