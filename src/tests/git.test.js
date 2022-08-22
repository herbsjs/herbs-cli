/* globals describe, it, afterEach */

const { system } = require('gluegun')
const fs = require('fs')
const path = require('path')
const projectName = 'herbs-test-runner'

const linknpm = () => system.run(`cd bin && npm link --force`)
const setGitUser = () => system.run(`git config --global user.email "you@example.com"`)
const setGitEmail = () => system.run(`git config --global user.name "Your Name"`)
const generateProject = () => system.run(`herbs new --name ${projectName} --description "testing the herbs CLI"  --author herbs --license MIT --graphql --rest --database sqlite --git yes --npmInstall no`)
const callHerbsCli = () => system.run(`herbs -v`)


describe('When I generate a complete project that uses git support', () => {
    after(() => {
        fs.rmSync(path.resolve(process.cwd(), `${projectName}`), { recursive: true })
    })

    it('must link npm herbs', async () => {
        await linknpm()
        await callHerbsCli()
    })
    
    it('must exists a .gitignore file', async () => {
        await setGitUser()
        await setGitEmail()
        await generateProject()
        fs.readFileSync(path.resolve(process.cwd(), `${projectName}/.gitignore`))
    })
})