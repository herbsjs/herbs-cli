
const { requireHerbarium } = require('../generators/utils')
const { runner } = require('@herbsjs/aloe/runner')

const cmd = {
    name: 'spec',
    description: 'Run Herbs spec tests',
    alias: ['s'],
    run: async toolbox => {

        const herbarium = requireHerbarium("spec", toolbox.filesystem.cwd())

        await runner({ herbarium })
    }
}

module.exports = cmd