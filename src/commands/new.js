const generator = require('../generator')
const cmd = {
  name: 'new',
  alias: ['n'],
  run: async toolbox => {
    const generators = await generator(toolbox)
    const layers = Object.keys(generators)
    for(const layer of layers) await generators[layer]()
  }
}

module.exports = cmd
