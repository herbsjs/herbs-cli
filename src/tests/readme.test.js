const { system, filesystem } = require('gluegun')
const { assert } = require('chai')
const fs = require('fs')
const path = require('path')

const projectName = 'herbs-readme-test-runner'
const projectDescription = 'I am test project description'

const linkNpm = () => system.run(`cd bin && npm link --force`)
const unlinkNpm = () => system.run(`cd bin && npm unlink --force @herbsjs/herbs-cli -g`)
const npmInstall = () => system.run(`cd ${projectName} && npm install`)

const generateProject = async (extraCMDs = '') => {
    system.run(`herbs new --name ${projectName} --description "${projectDescription}" --author herbs --license MIT --graphql --rest --database postgres --npmInstall no ${extraCMDs}`)
}

describe('generates readme file', () => {
    afterEach(async () => {
        fs.rmSync(path.resolve(process.cwd(), `${projectName}`), { recursive: true })
        await unlinkNpm()
      })

    it.only('must to use custom user data', async () => {

        await linkNpm()
        await generateProject()
        await npmInstall()

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
