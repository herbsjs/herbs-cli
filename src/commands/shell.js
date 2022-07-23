const inquirer = require('inquirer')
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))
const { requireHerbarium } = require('../generators/utils')
const repl = require('@herbsjs/herbs2repl')
const path = require('path')

function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

let user = ''

const permissions = [
  {
    type: 'fuzzypath',
    name: 'path',
    excludePath: nodePath => nodePath.startsWith('node_modules'),
    itemType: 'file',
    rootPath: './',
    message: 'Select a target file for your user permissions:',
  }
]

const cmd = {
  name: 'shell',
  description: 'Run herbs shell to interact with your project easily',
  alias: ['sh'],
  run: async toolbox => {
    const { options } = toolbox.parameters
    const { red } = toolbox.print.colors
    const herbarium = requireHerbarium("shell", toolbox.filesystem.cwd())

    if (!herbarium.requireAll) {
      toolbox.print.info(`\n ${red('• Exit with error: Herbarium not found 😢')}`)
      return
    }

    herbarium.requireAll()

    const usecases = Array.from(herbarium.usecases.all).map(([_, item]) =>
        ({ usecase: item.usecase(), id: item.id, tags: { group: item.group || "Others" } }))

    if (!usecases.length) {
      toolbox.print.info(`\n ${red('• Exit with error: useCases not found 😢')}`)
      return
    }

    if (isEmpty(options.user)) {
      const filePath = await inquirer.prompt(permissions)
      user = require(path.normalize(`${toolbox.filesystem.cwd()}/${filePath.path}`))
    } else {
      user = JSON.parse(options.user)
    }

    repl(usecases, user, { groupBy: "group" })
  }
}

module.exports = cmd
