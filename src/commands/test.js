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

        const { grey, green, red, white, blue, italic } = toolbox.print.colors
        const failed = 'failed'
        for (const spec of specs) {
            const ret = await spec.run()
            const usecase = spec.usecase().description
            const result = (ret) => ret !== failed ? green('🗸') : red('•')
            toolbox.print.info(`${white(usecase)} ${result(ret)} ${grey(italic('(spec)'))}`)
            for (const scenario of spec.scenarios) {
                toolbox.print.info(`   ${result(scenario.state)} ${white(scenario.description)} ${grey(italic('(scenario)'))}`)
                if (scenario.state !== failed) continue
                const steps = (step) => step.forEach(e => {
                    const description = e.builtin ? `When run` : e.description
                    const color = e.state !== failed ? grey : red
                    const type = `(${e.type})`
                    toolbox.print.info(`      ${result(e.state)} ${color(description)} ${grey(italic(type))}`)
                    if (e.error)
                        toolbox.print.info(`\n          ${blue(e.error)} \n`)
                })
                steps(scenario.givens)
                if (scenario.stage === 'given') continue
                steps(scenario.whens)
                if (scenario.stage === 'when') continue
                steps(scenario.checks)
            }
        }

        toolbox.print.success('Test finished! 🤩')
    }
}



module.exports = cmd
