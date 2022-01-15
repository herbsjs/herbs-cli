/* globals describe, it, afterEach */

const { system, filesystem } = require('gluegun')
const { expect } = require('chai')
const fs = require('fs')

const projectName = 'herbs-lab'

const generateProject = () => system.run(`herbs new --name ${projectName}  --description "testing the herbs CLI"  --author herbs --license MIT --graphql --rest --postgres --git`)

describe('When I generate a complete project that uses postgres', () => {
  afterEach(() => {
    fs.rmdirSync(`${__dirname}/../${projectName}`, { recursive: true })
  })

  it('must exists a config/postgres.js file', async () => {
    await generateProject()
    fs.readFileSync(`${__dirname}/../${projectName}/src/infra/config/postgres.js`)
  })

  it('must contain the correct content', async () => {
    await generateProject()
    const postgresConfig = require(`${__dirname}/../${projectName}/src/infra/config/postgres.js`)
    expect(postgresConfig).to.deep.equal({
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        user: 'postgres',
        database: '',
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
          database: 'herbs-lab',
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

