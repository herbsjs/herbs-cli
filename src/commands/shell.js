const { requireHerbarium } = require('../generators/utils')
const repl = require('C:/dev/herbs/herbs2repl')

const cmd = {
  name: 'shell',
  description: 'Run Herbs Shell',
  run: async toolbox => {
    const { red } = toolbox.print.colors
    const herbarium = requireHerbarium("shell", toolbox.filesystem.cwd())

    if (!herbarium.requireAll) {
      toolbox.print.info(`\n ${red('• Exit with error: Herbarium not found 😢')}`)
      return
    }

    herbarium.requireAll()

    async function main(injection) {
      const usecases = Array.from(herbarium.usecases.all).map(([_, item]) =>
          ({ usecase: item.usecase(injection), id: item.id, tags: { group: item.group || "useCase" } }))

      const user = {
          canCreateItem: true, canCreateList: true, canDeteleList: false,
          canGetLists: true, canUpdateItem: true, canUpdateList: true
      }

      if (!usecases.length) {
        toolbox.print.info(`\n ${red('• Exit with error: useCases not found 😢')}`)
        return
      }

      repl(usecases, user, { groupBy: "group" })
    }
    main().then()
  }
}

module.exports = cmd
