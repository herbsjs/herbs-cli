/* globals describe, it, afterEach */

const { system, filesystem } = require('gluegun')
const { expect } = require('chai')
const fs = require('fs')
const moveFolder = require('../utils/move-folder')

const projectName = 'herbs-lab'
const projectTmpName = 'project-tmp'
const src = filesystem.path(__dirname, '..')
const binPath = filesystem.path(src, 'bin', 'herbs')
const tmpPath = filesystem.path(src, 'tmp', 'node_modules')
const nodeModulesProjectTmpPath = filesystem.path(src, projectTmpName, 'node_modules')
const projectGeneratedPath = filesystem.path(src, projectName)

const cli = async (cmd) => system.run(`node ${binPath} ${cmd}`)

describe('generates package.json', () => {
  before(async () => {
    await cli(`new --name ${projectTmpName}`)
    await moveFolder(nodeModulesProjectTmpPath, tmpPath)
    filesystem.remove(projectTmpName)

    fs.mkdir(`${src}/${projectName}`, () => {})
    await moveFolder(`${src}/tmp/`, projectGeneratedPath)
  })

  after(() => {
    filesystem.remove(`${src}/${projectName}`)
  })

  it('must to use all custom options', async () => {
    await cli(
      `new --name ${projectName} --description "testing the herbs CLI" --author herbs --licence MIT`
    )

    const pkg = filesystem.read(`${projectName}/package.json`)

    expect(pkg).contains(`"name": "${projectName}"`)
    expect(pkg).contains('"description": "testing the herbs CLI"')
    expect(pkg).contains('"author": "herbs"')
    expect(pkg).contains('"license": "MIT"')
  })

  it('must to use yarn', async () => {
    await cli(`new --name ${projectName} --yarn`)
    filesystem.read(`${projectName}/yarn.lock`)
  })

  it('must to have knex scripts to postgres', async () => {
    await cli(`new --name ${projectName} --postgres`)

    const knex = filesystem.read(`${projectName}/knexFile.js`)
    expect(knex).contains(`database: '${projectName}'`)

    const pkg = filesystem.read(`${projectName}/package.json`)
    expect(pkg).contains(
      '"knex:make": "npx knex --knexfile knexFile.js migrate:make"'
    )
    expect(pkg).contains(
      '"knex:migrate": "npx knex --knexfile knexFile.js migrate:latest"'
    )
    expect(pkg).contains(
      '"knex:rollback": "npx knex --knexfile knexFile.js migrate:rollback"'
    )
    expect(pkg).contains(
      '"knex:makeSeeds": "npx knex --knexfile knexFile.js seed:make"'
    )
    expect(pkg).contains(
      '"knex:runSeeds": "npx knex --knexfile knexFile.js seed:run"'
    )
  })

  it('must to have knex scripts to sql server', async () => {
    await cli(`new --name ${projectName} --sqlserver`)

    const knex = filesystem.read(`${projectName}/knexFile.js`)
    expect(knex).contains(`database: '${projectName}'`)

    const pkg = filesystem.read(`${projectName}/package.json`)
    expect(pkg).contains(
      '"knex:make": "npx knex --knexfile knexFile.js migrate:make"'
    )
    expect(pkg).contains(
      '"knex:migrate": "npx knex --knexfile knexFile.js migrate:latest"'
    )
    expect(pkg).contains(
      '"knex:rollback": "npx knex --knexfile knexFile.js migrate:rollback"'
    )
    expect(pkg).contains(
      '"knex:makeSeeds": "npx knex --knexfile knexFile.js seed:make"'
    )
    expect(pkg).contains(
      '"knex:runSeeds": "npx knex --knexfile knexFile.js seed:run"'
    )
  })
})

describe('generates knexFile.json', () => {
  afterEach(() => {
    filesystem.remove(projectName)
  })

  it('must to use yarn', async () => {
    await cli(`new --name ${projectName} --yarn`)
    filesystem.read(`${projectName}/yarn.lock`)
  })
})

describe('checking commands output', () => {
  it('mut to have version', async () => {
    expect(await cli('--version')).to.not.equal(null)
    expect(await cli('--help')).to.not.equal(null)
  })
})

