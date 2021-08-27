const generator = require('../generators')

const cmd = {
  name: 'update',
  description: 'Create a all layers for new entity(ies) added into project',
  alias: ['u'],
  run: async toolbox => {
    const generators = (await generator(toolbox)).update
    for (const layer of Object.keys(generators)) { await generators[layer]() }
  }
}

module.exports = cmd
