const { filesystem } = require('gluegun')
const { expect } = require('chai')
const cliCommand = require('../helpers/cli-command')
const checkIfStringExistsInFile = require('../helpers/check-if-string-exists-in-file')
const generateRandomProjectName = require('../helpers/generate-random-project-name')

const projectName = generateRandomProjectName()

describe('Mongo layer', () => {
  afterEach(() => {
    filesystem.remove(projectName)
  })

  it('should create a project with mongodb dependency', async () => {
    // Given
    await cliCommand(`new --name ${projectName} --mongo`)

    // When
    const packageFile = filesystem.read(`${projectName}/package.json`)
    const mongodbDependencyExists = checkIfStringExistsInFile(packageFile, '"mongodb":')
    const herbs2mongoDependencyExists = checkIfStringExistsInFile(packageFile, '"@herbsjs/herbs2mongo":')

    // Then
    expect(mongodbDependencyExists).to.be.true
    expect(herbs2mongoDependencyExists).to.be.true
  })

  it('should create index file with MongoClient', async () => {
    // Given
    await cliCommand(`new --name ${projectName} --mongo`)

    // When
    const indexFileInDatabaseFolder = filesystem.read(`${projectName}/src/infra/data/database/index.js`)

    // Then
    expect(indexFileInDatabaseFolder).not.equal(undefined)
  })

  it('should create userRepository and have herbs2mongo import', async () => {
    // Given
    await cliCommand(`new --name ${projectName} --mongo`)

    // When
    const userRepositoryFile = filesystem.read(`${projectName}/src/infra/data/repositories/userRepository.js`)
    const herbs2mongoRequireExists = checkIfStringExistsInFile(userRepositoryFile, "require('@herbsjs/herbs2mongo')")

    // Then
    expect(userRepositoryFile).not.equal(undefined)
    expect(herbs2mongoRequireExists).to.be.true
  })

  it('should not create knexFile.js when to use mongodb', async () => {
    // Given
    await cliCommand(`new --name ${projectName} --mongo`)

    // When
    const knexFile = filesystem.read(`${projectName}/knexFile.js`)

    // Then
    expect(knexFile).equal(undefined)
  })
})

