const { system, filesystem } = require('gluegun')

const src = filesystem.path(__dirname, '..')

const cliCommand = async (cmd) => {
  const fullCommand = `node ${filesystem.path(src, 'bin', 'herbs')} ${cmd}`
  await system.run(fullCommand)
}

module.exports = cliCommand
