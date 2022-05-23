const glob = require('glob')
const path = require('path')

const cmd = {
    name: 'test',
    description: 'Run Herbs spec tests',
    alias: ['t'],
    run: async toolbox => {

        const files = glob.sync('./**/*.aloe.test.js')
        const specs = []
        for (const file of files) {
            const instance = require(path.resolve(file))
            if (instance.isSpec) specs.push(instance)
        }

        const { grey, green, red } = toolbox.print.colors
        const passed = 'passed'
        for (const spec of specs) {
            const ret = await spec.run()
            const usecase = spec.usecase().description
            const result = (ret) => ret === passed ? green('🗸') : red('•')
            toolbox.print.info(`${grey(usecase)} ${result(ret)}`)
            for (const scenario of spec.scenarios) {
                toolbox.print.info(`   ${grey(scenario.description)} ${result(scenario.state)}`)
            }
        }

        toolbox.print.success('Test finished! 🤩')
    }
}



module.exports = cmd
