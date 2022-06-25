/* globals describe, it, afterEach */

const { system } = require('gluegun')
const fs = require('fs')
const path = require('path')

const projectName = 'herbs-test-runner'

const linknpm = () => system.run(`cd bin && npm link --force`)
const setGitUser = () => system.run(`git config --global user.email "douglas.f.brito@gmail.com"`)
const setGitEmail = () => system.run(`git config --global user.name "DevDougBrito"`)
const generateProject = () => system.run(`herbs new --name ${projectName} --description "testing the herbs CLI"  --author herbs --license MIT --graphql --rest --database postgres --git yes --npmInstall no`)

describe('When I generate a complete project that uses git support', () => {
    afterEach(() => {
        fs.rmSync(path.resolve(process.cwd(), `${projectName}`), { recursive: true })
    })

    it('must exists a .gitignore file', async () => {
        await linknpm()
        await setGitUser()
        await setGitEmail()
        await generateProject()
        fs.readFileSync(path.resolve(process.cwd(), `${projectName}/.gitignore`))
    })
})