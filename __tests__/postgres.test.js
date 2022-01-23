const { filesystem } = require('gluegun')
const { expect } = require('chai')
const cliCommand = require('../helpers/cli-command')
const checkPatternExistsInString = require('../helpers/check-pattern-exists-in-string')

const projectName = 'herbs-lab'

describe('Postgres layer', () => {
  afterEach(() => {
    filesystem.remove(projectName)
  })

  it('should create knexFile.js with postgres config', async () => {
    // Given
    await cliCommand(`new --name ${projectName} --postgres`)

    // When
    const knexFile = filesystem.read(`${projectName}/knexFile.js`)

    // Then
    expect(knexFile).contains(`database: '${projectName}'`)
    expect(knexFile).contains('user: "postgres"')
    expect(knexFile).contains('password: "postgres"')
    expect(knexFile).contains('host: "127.0.0.1"')
    expect(knexFile).contains('port: 5432')
  })

  it('should create a project with postgres dependency', async () => {
    // Given
    await cliCommand(`new --name ${projectName} --postgres`)

    // When
    const package = filesystem.read(`${projectName}/package.json`)
    const postgresDependencyExists = checkPatternExistsInString(package, '"pg":')

    // Then
    expect(postgresDependencyExists).be.true
  })

  it('should create knex scripts when to use postgres', async () => {
    // Given
    await cliCommand(`new --name ${projectName} --postgres`)

    // When
    const packageFile = filesystem.read(`${projectName}/package.json`)

    // Then
    expect(packageFile).contains('"knex:make": "npx knex --knexfile knexFile.js migrate:make"')
    expect(packageFile).contains('"knex:migrate": "npx knex --knexfile knexFile.js migrate:latest"')
    expect(packageFile).contains('"knex:rollback": "npx knex --knexfile knexFile.js migrate:rollback"')
    expect(packageFile).contains('"knex:makeSeeds": "npx knex --knexfile knexFile.js seed:make"')
    expect(packageFile).contains('"knex:runSeeds": "npx knex --knexfile knexFile.js seed:run"')
  })
})

