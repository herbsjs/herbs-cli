const { requireHerbarium } = require('../generators/utils')
const repl = require('@herbsjs/herbs2repl')
const path = require('path')
const fs = require('fs')

function getPermissionsDefault(appPath, options) {
  const file = options?.permissions || 'src/infra/shell/permissions.js'
  const filePath = path.normalize(`${appPath}/${file}`)
  if (fs.existsSync(filePath)) return require(filePath)

  return {}
}

let user

const cmd = {
  name: 'shell',
  description: 'Run herbs shell to interact with your project easily',
  alias: ['sh'],
  run: async toolbox => {
    const { options } = toolbox.parameters
    const { red } = toolbox.print.colors
    const herbarium = requireHerbarium("shell", toolbox.filesystem.cwd())

    const usecases = Array.from(herbarium.usecases.all).map(([_, item]) =>
        ({ usecase: item.usecase, id: item.id, tags: { group: item.group || "Others" } }))

    if (!usecases.length) {
      toolbox.print.info(`\n ${red('• Exit with error: useCases not found 😢')}`)
      return
    }
    
    user = getPermissionsDefault(toolbox.filesystem.cwd(), options)

    repl(usecases, user, { groupBy: "group" })
  }
}

module.exports = cmd
