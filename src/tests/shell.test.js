/* eslint-disable no-console */
/* globals describe, it, afterEach */

const { system } = require('gluegun')
const path = require('path')
const fs = require('fs')
const { expect } = require('chai')
const projectName = 'herbs-test-runner'
const { exec } = require('node:child_process')

const linknpm = () => system.run(`cd bin && npm link --force`)
const generateProject = () => system.run(`herbs new --name ${projectName} --description "testing the herbs CLI"  --author herbs --license MIT --graphql --rest --database mongo --npmInstall yes`)
const herbsShell = () => system.run(`cd ${path.resolve(process.cwd(), `${projectName}`)} && herbs shell`)

describe('When I use Herbs Shell', () => {
    afterEach(() => {
        fs.rmSync(path.resolve(process.cwd(), `${projectName}`), { recursive: true })
    })

    it('Should return not found message if there is no use case', async () => {
      await linknpm()
      await generateProject()
      fs.rmSync(path.resolve(process.cwd(), `${projectName}/src/domain/usecases/user`), { recursive: true })
      const result = await herbsShell()
      expect(result).to.deep.contains('• Exit with error: useCases not found 😢')
    })

    it('Should return not found message if there is no Herbarium', async () => {
      await linknpm()
      await generateProject()
      fs.rmSync(path.resolve(process.cwd(), `${projectName}/src/domain/herbarium.js`))
      const dir = `${path.resolve(process.cwd(), `${projectName}/src/domain/herbarium.js`)}`
      fs.writeFileSync(dir, "const { herbarium } = require('@herbsjs/herbarium')")
      const result = await herbsShell()
      expect(result).to.deep.contains('• Exit with error: Herbarium not found 😢')
    })

    it('Should exit if Herbs Shell runs without errors.', async () => {
      await linknpm()
      await generateProject()
      const pid = exec(`cd ${path.resolve(process.cwd(), `${projectName}`)} && herbs shell`).pid
      exec(`taskkill /F /PID ${pid}`)
    })

    it('Hope there is a default permission file when user doesnt tell', async () => {
      await linknpm()
      await generateProject()
      expect(fs.existsSync(path.resolve(process.cwd(), `${projectName}/src/infra/shell/permissions.js`))).to.be.true
    })
})

