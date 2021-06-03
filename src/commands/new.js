const generator = require('../generator')
const cmd = {
  name: 'new',
  alias: ['n'],
  run: async toolbox => {
    const generate = await generator(toolbox)
    Object.keys(generate).forEach(async layer => {
      await generate[layer]()
    })
  }
}

module.exports = cmd
