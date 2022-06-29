
module.exports =
  async ({ template: { generate }, system, filesystem }) =>
    async () => {
      const directory = filesystem.cwd()
      const platform = process.platform
      const { spawnSync, exec } = require('child_process')
      const where = platform === 'win32' ? 'where.exe' : 'which'
      const out = spawnSync(where, ['git'])

      if (out.status === 1) {
        process.stdout.write(`[ERROR] Git not found\n install it via https://git-scm.com/downloads and try again, or skip the git option when generates a new project with Herbs-CLI\n`)
      } else {
        process.stdout.write(`Generating git\n`)
        exec('git config --list', (error) => {
            if (error) {
              process.stdout.write(`exec error: ${error}`)
              return
            }
          })
        await generate({
          template: 'infra/config/.gitignore.ejs',
          target: '.gitignore',
        })
        await system.run('git init', { cwd: directory })
        await system.run('git branch -m main', { cwd: directory })
        await system.run('git add --all', { cwd: directory })
        await system.run('git commit -m "initial commit"', { cwd: directory })
      }
    }
