/* globals describe, it, afterEach */

const { system } = require('gluegun')
const { expect } = require('chai')
const fs = require('fs')
const path = require('path')

const projectName = 'herbs-test-runner'

const generateProject = () => system.run(`herbs new --name ${projectName} --description "testing the herbs CLI"  --author herbs --license MIT --graphql --rest no --database postgres --npmInstall yes`)
const callHerbsCli = () => system.run(`herbs`)

const herbsUpdate = () => system.run(`cd ${projectName} && herbs update`)

describe('When I generate a complete project that uses postgres', () => {
  afterEach(async () => {
    fs.rmSync(path.resolve(process.cwd(), `${projectName}`), { recursive: true })
  })

  it('Should I create a new repository with foreign key', async () => {
    await generateProject()
    await callHerbsCli()
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
    await herbsUpdate()
    expect(fs.existsSync(path.resolve(process.cwd(), `${projectName}/src/infra/data/repositories/customerRepository.js`))).to.be.true
  })
})

