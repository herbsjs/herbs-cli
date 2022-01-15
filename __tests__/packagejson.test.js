/* globals describe, it, afterEach */

const { system, filesystem } = require('gluegun')
const { expect } = require('chai')
const fs = require('fs')

const projectName = 'herbs-lab'

const generateProject = (extraCMDs = '') => system.run(`herbs new --name ${projectName}  --description "testing the herbs CLI"  --author herbs --license MIT --graphql --rest --postgres --git ${extraCMDs}`)

describe('generates package.json', () => {
  afterEach(() => {
    fs.rmdirSync(`${__dirname}/../${projectName}`, { recursive: true })
  })

  it('must to use all custom options', async () => {
    await generateProject()
    const pkg = JSON.parse(filesystem.read(`${projectName}/package.json`))

    expect(pkg.name).contains(projectName)
    expect(pkg.description).contains('testing the herbs CLI')
    expect(pkg.author).contains('herbs')
    expect(pkg.license).contains('MIT')
  })
})
