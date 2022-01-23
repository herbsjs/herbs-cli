const { system, filesystem } = require('gluegun')

const src = filesystem.path(__dirname, '..')

const cliCommand = async (cmd) => {
  const fullCmd = `node ${filesystem.path(src, 'bin', 'herbs')} ${cmd}`
  await system.run(fullCmd)
}

module.exports = cliCommand
