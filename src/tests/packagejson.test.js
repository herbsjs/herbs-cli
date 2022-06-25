/* globals describe, it, afterEach */

const { system, filesystem } = require('gluegun')
const { expect } = require('chai')
const fs = require('fs')
const path = require('path')

const projectName = 'herbs-test-runner'

const generateProject = (extraCMDs = '') => system.run(`herbs new --name ${projectName}  --description "testing the herbs CLI"  --author herbs --license MIT --graphql --rest --database postgres git no --npmInstall no ${extraCMDs}`)

describe('generates package.json', () => {
  afterEach(() => {
    fs.rmSync(path.resolve(process.cwd(), `${projectName}`), { recursive: true })
  })

  it('must to use all custom options', async () => {

    await generateProject()
    const pkg = JSON.parse(filesystem.read(path.resolve(process.cwd(), `${projectName}/package.json`)))

    expect(pkg.name).contains(projectName)
    expect(pkg.description).contains('testing the herbs CLI')
    expect(pkg.author).contains('herbs')
    expect(pkg.license).contains('MIT')
  })
})
