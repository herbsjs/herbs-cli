const { requireHerbarium } = require('../generators/utils')
const inquirer = require('inquirer')
const repl = require('@herbsjs/herbs2repl')

function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

const permissions = [
  {
    type: 'confirm',
    name: 'canCreateItem',
    message: 'Can you create a item?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'canCreateList',
    message: 'Can you create a list?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'canGetLists',
    message: 'Can you get a lists?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'canDeteleList',
    message: 'Can you delete a list?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'canUpdateItem',
    message: 'Can you update a item?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'canUpdateList',
    message: 'Can you update a list?',
    default: true,
  },
]

const cmd = {
  name: 'shell',
  description: 'Run herbs shell to interact with your project easily',
  alias: ['sh'],
  run: async toolbox => {
    let { options } = toolbox.parameters
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

    if (isEmpty(options)) {
      options = await inquirer.prompt(permissions)    
    }

    repl(usecases, options, { groupBy: "group" })
  }
}

module.exports = cmd
