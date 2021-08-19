/* globals describe, it, afterEach */

const { system, filesystem } = require('gluegun')
const { expect } = require('chai')

const src = filesystem.path(__dirname, '..')

const cli = async cmd =>
  system.run('node ' + filesystem.path(src, 'bin', 'herbs') + ` ${cmd}`)

const projectName = 'herbs-lab'

describe('generates package.json', () => {
  afterEach(() => {
    filesystem.remove(projectName)
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

  it('must to have knex scripts', async () => {
    await cli(`new --name ${projectName} --postgres`)

    const knex = filesystem.read(`${projectName}/knexFile.js`)
    expect(knex).contains(`database: '${projectName}'`)

    const pkg = filesystem.read(`${projectName}/package.json`)
    expect(pkg).contains(
      '"knex:make": "npx knex --knexfile knexfile.js migrate:make"'
    )
    expect(pkg).contains(
      '"knex:migrate": "npx knex --knexfile knexfile.js migrate:latest"'
    )
    expect(pkg).contains(
      '"knex:rollback": "npx knex --knexfile knexfile.js migrate:rollback"'
    )
    expect(pkg).contains(
      '"knex:makeSeeds": "npx knex --knexfile knexfile.js seed:make"'
    )
    expect(pkg).contains(
      '"knex:runSeeds": "npx knex --knexfile knexfile.js seed:run"'
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
