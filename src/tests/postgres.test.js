/* globals describe, it, afterEach */

const { system } = require('gluegun')
const { expect } = require('chai')
const fs = require('fs')
const path = require('path')

const projectName = 'herbs-test-runner'

const generateProject = () => system.run(`herbs new --name ${projectName} --description "testing the herbs CLI"  --author herbs --license MIT --graphql --rest --database postgres git no --npmInstall yes`)

const npmInstall = () => system.run(`cd ${projectName} && npm install`)

describe('When I generate a complete project that uses postgres', () => {
  afterEach(() => {
    fs.rmSync(path.resolve(process.cwd(), `${projectName}`), { recursive: true })
  })

  it('must exists a config/postgres.js file', async () => {
    await generateProject()
    fs.readFileSync(path.resolve(process.cwd(), `${projectName}/src/infra/config/postgres.js`))
  })

  it('must contain the correct content', async () => {

    await generateProject()
    await npmInstall()

    const postgresConfig = require(path.resolve(process.cwd(), `${projectName}/src/infra/config/postgres.js`))
    expect(postgresConfig).to.deep.equal({
      herbsCLI: 'postgres',
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        user: 'postgres',
        database: projectName,
        password: 'postgres'
      }
    })
  })

  it('must to have configured knex file', async () => {
    await generateProject()
    const knex = require(`${projectName}/knexFile.js`)

    expect(knex).to.deep.equal({
      development: {
        client: 'postgresql',
        connection: {
          database: projectName,
          user: 'postgres',
          password: 'postgres',
          host: '127.0.0.1',
          port: 5432
        },
        migrations: {
          directory: './src/infra/data/database/migrations',
          tableName: 'knex_migrations'
        }
      },
      staging: {},
      production: {}
    })
  })
})

