/* globals describe, it, after */

const { system } = require('gluegun')
const path = require('path')
const fs = require('fs')
const { expect } = require('chai')
const projectName = 'herbs-test-runner'

const linknpm = () => system.run(`cd bin && npm link --force`)
const setGitUser = () => system.run(`git config --global user.email "you@example.com"`)
const setGitEmail = () => system.run(`git config --global user.name "Your Name"`)
const generateProject = () => system.run(`herbs new --name ${projectName} --description "testing the herbs CLI"  --author herbs --license MIT --graphql --rest --database mongo --npmInstall yes`)
const herbsSpec = () => system.run(`cd ${path.resolve(process.cwd(), `${projectName}`)} && herbs spec`)

describe('When I use Herbs Spec', () => {
    after(() => {
        fs.rmSync(path.resolve(process.cwd(), `${projectName}`), { recursive: true })
    })

    it('Should return success message if no errors found', async () => {
      await linknpm()
      await setGitUser()
      await setGitEmail()
      await generateProject()
      const result = await herbsSpec()
      // 13 is the number of tests in the sample project
      expect(result).to.deep.contains('Passing:  13') 
    })
})

