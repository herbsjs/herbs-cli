const { system, filesystem } = require('gluegun')
const { assert } = require('chai')
const fs = require('fs')
const path = require('path')

const projectName = 'herbs-readme-test-runner'
const projectDescription = 'I am test project description'

const npmInstall = () => system.run(`cd ${projectName} && npm install`)

const generateProject = (extraCMDs = '') => system.run(`herbs new --name ${projectName} --description "${projectDescription}" --author herbs --license MIT --graphql --rest --database postgres --npmInstall no ${extraCMDs}`)

describe('generates readme file', () => {
    afterEach(() => {
        fs.rmSync(path.resolve(process.cwd(), `${projectName}`), { recursive: true })
      })

    it('must to use custom database option', async () => {

        await generateProject()
        await npmInstall()

        const pkg = filesystem.read(path.resolve(process.cwd(), `${projectName}/readme.md`))

        const result = pkg.indexOf('Postgres')

        assert.typeOf(pkg, 'string')
        assert.isAbove(result, -1)
    }),

    it.only('must to use custom project name and description', async () => {

        await generateProject()
        await npmInstall()

        const pkg = filesystem.read(path.resolve(process.cwd(), `${projectName}/readme.md`))

        const findProjectName = pkg.indexOf(projectName)
        const findProjectDescription = pkg.indexOf(projectDescription)

        assert.typeOf(pkg, 'string')
        assert.isAbove(findProjectName, -1)
        assert.isAbove(findProjectDescription, -1)
    })
})