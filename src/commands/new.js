const generator = require('../generator')
const cmd = {
  name: 'new',
  alias: ['n'],
  run: async toolbox => {
    const generate = await generator(toolbox)
    await generate.packageJson()
    await generate.entities()
    await generate.errors()
    await generate.useCases()
    await generate.graphql()
  }
}

module.exports = cmd
