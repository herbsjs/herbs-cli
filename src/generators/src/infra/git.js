module.exports =
  async ({ template: { generate }, system, filesystem }) =>
    async () => {
      const directory = filesystem.cwd()
      const platform = process.platform
      const { spawnSync } = require('child_process')
      const where = platform === 'win32' ? 'where.exe' : 'which'
      const out = spawnSync(where, ['git'])

      if (out.exitCode === 1) {
        process.stdout.write(`Git not found\n`)
      } else {
        process.stdout.write(`Generating git\n`)
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
