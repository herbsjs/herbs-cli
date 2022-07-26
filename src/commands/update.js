const generator = require('../generators')

const cmd = {
  name: 'update',
  description: 'Updates and create files based on the entities and use cases',
  alias: ['u'],
  run: async toolbox => {
    const generators = (await generator(toolbox)).update
    await exec('npx eslint \"**/*.{js,jsx}\" --fix')
    for (const layer of Object.keys(generators)) { await generators[layer]() }
    toolbox.print.success('Project updated! 🤩')
  }
}

module.exports = cmd
