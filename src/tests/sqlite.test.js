/* globals describe, it, after */

const { system } = require('gluegun')
const { expect } = require('chai')
const fs = require('fs')
const path = require('path')

const projectName = 'herbs-test-runner'

const generateProject = () => system.run(`herbs new --name ${projectName} --description "testing the herbs CLI"  --author herbs --license MIT --graphql --rest --database sqlite git no --npmInstall yes`)

const npmInstall = () => system.run(`cd ${projectName} && npm install`)

describe('When I generate a complete project that uses sqlite', () => {
  after(() => {
    fs.rmSync(path.resolve(process.cwd(), `${projectName}`), { recursive: true })
  })

  it('must exists a config/sqlite.js file', async () => {
    await generateProject()
    await npmInstall()
    fs.readFileSync(path.resolve(process.cwd(), `${projectName}/src/infra/config/sqlite.js`))
  })

  it('must contain the correct content', async () => {
    const sqliteConfig = require(path.resolve(process.cwd(), `${projectName}/src/infra/config/sqlite.js`))
    expect(sqliteConfig).to.deep.equal({
      herbsCLI: 'sqlite',
      client: 'sqlite3',
      useNullAsDefault:true,
      connection: {
        filename: 'file.sqlite:memDb1?mode=memory&cache=shared'
      }
    })
  })
})

