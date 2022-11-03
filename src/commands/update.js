const generator = require('../generators')
const getToolbox = require('../helpers/toolbox')

const cmd = {
  name: 'update',
  description: 'Updates and create files based on the entities and use cases',
  alias: ['u'],
  run: async toolbox => {
    const { colors, print, prompt, template, filesystem, theme } = getToolbox(toolbox)

    print.info(`\n${theme.intro('Herbs 🌿 Update')}\n`)

    const generators = (await generator(toolbox)).update
    for (const layer of Object.keys(generators)) { await generators[layer]() }
    toolbox.print.success('Project updated! 🤩')
  }
}

module.exports = cmd
