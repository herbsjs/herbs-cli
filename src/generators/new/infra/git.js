module.exports = async ({ template: { generate }, system, filesystem }) => async () => {
  const platform = process.platform
  const { spawn } = require('child_process')
  const where = platform === 'win32' ? 'where' : 'which'
  const out = spawn(where,['git'])

  out.on('close', (code) => {
    // eslint-disable-next-line no-console
    console.log(`child process exited with code ${code}`)
  })
  
  let directory = filesystem.cwd()

  await generate({
    template: 'infra/config/.gitignore.ejs',
    target: '.gitignore'
  })

  await system.run('git init', {cwd: directory})
  await system.run('git branch -m main', {cwd: directory})
  await system.run('git add --all', {cwd: directory})
  await system.run('git commit -m "initial commit"', {cwd: directory})
}
