const generator = require('../generator')
const cmd = {
  name: 'new',
  alias: ['n'],
  run: async toolbox => {
    const generate = await generator(toolbox)
    Object.keys(layer => {
      generate[layer]()
    })
  }
}

module.exports = cmd
