const generator = require('../generator')
const fs = require('fs');

const cmd = {
  name: 'new',
  alias: ['n'],
  run: async toolbox => {
    const dir = `${toolbox.filesystem.cwd()}/${toolbox.parameters.options.name}`;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    process.chdir(dir);

    const generators = await generator(toolbox)
    const layers = Object.keys(generators)
    for(const layer of layers) await generators[layer]()
  }
}

module.exports = cmd
