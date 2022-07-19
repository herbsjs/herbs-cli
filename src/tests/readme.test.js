const { system, filesystem } = require('gluegun')
const { assert } = require('chai')
const fs = require('fs')
const path = require('path')

const projectName = 'herbs-readme-test-runner'
const projectDescription = 'I am test project description'

const generateProject = (extraCMDs = '') => system.run(`herbs new --name ${projectName} --description "${projectDescription}" --author herbs --license MIT --graphql --rest --database postgres --npmInstall no ${extraCMDs}`)

describe('generates readme file', () => {
    afterEach(async () => {
        fs.rmSync(path.resolve(process.cwd(), `${projectName}`), { recursive: true })
      })

    it('must to use custom user data', async () => {

        await generateProject()

        const pkg = filesystem.read(path.resolve(process.cwd(), `${projectName}/readme.md`))

        const findProjectDatabase = pkg.indexOf('Postgres')
        const findProjectName = pkg.indexOf(projectName)
        const findProjectDescription = pkg.indexOf(projectDescription)

        assert.typeOf(pkg, 'string')
        assert.isAbove(findProjectDatabase, -1)
        assert.isAbove(findProjectName, -1)
        assert.isAbove(findProjectDescription, -1)
    })
})
