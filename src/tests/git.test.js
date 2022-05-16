const { system } = require('gluegun')
const fs = require('fs')
const path = require('path')

const projectName = 'herbs-test-runner'

const generateProject = (extraCMDs = '') => system.run(`herbs new --name ${projectName} --description "testing the herbs CLI"  --author herbs --license MIT --graphql --rest --database postgres --git yes --npmInstall no ${extraCMDs} `)

describe('When I generate a complete project that uses git support', () => {
    afterEach(() => {
        fs.rmSync(path.resolve(process.cwd(), `${projectName}`), { recursive: true })
    })

    it('must exists a .gitignore file', async () => {
        await generateProject()
        fs.readFileSync(path.resolve(process.cwd(), `${projectName}/.gitignore`))
    })
})