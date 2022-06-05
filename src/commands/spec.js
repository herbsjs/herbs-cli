const glob = require('glob')
const path = require('path')
const { requireHerbarium } = require('../generators/utils')

const cmd = {
    name: 'spec',
    description: 'Run Herbs spec tests',
    alias: ['s'],
    run: async toolbox => {

        const herbarium = requireHerbarium("spec", toolbox.filesystem.cwd())
        const specs = herbarium.specs.all

        const { grey, green, red, white, blue, italic } = toolbox.print.colors
        const failed = 'failed'
        let errorCount = 0

        for (const specInfo of Array.from(specs.values())) {
            const spec = specInfo.spec
            const ret = await spec.run()
            const usecase = spec.usecase().description
            const result = (ret) => ret !== failed ? green('🗸') : red('•')
            const color = ret !== failed ? white : red
            toolbox.print.info(`${color(usecase)} ${grey(italic('(spec)'))}`)
            for (const scenario of spec.scenarios) {
                toolbox.print.info(`   ${result(scenario.state)} ${white(scenario.description)} ${grey(italic('(scenario)'))}`)
                if (scenario.state !== failed) continue

                for (const samples of scenario.samples) {
                    for (const sample of samples.execution.scenarios) {
                        const prettyPrint = (sample) => {
                            for (const entrie of Object.entries(sample)) {
                                toolbox.print.info(`        ${white(`${entrie[0]}: ${entrie[1]}`)}`)    
                            }
                        }

                        if (!samples.builtin) {
                            toolbox.print.info(`   ${white(`${samples.description} ${grey(italic('(sample)'))}:`)}`)
                            prettyPrint(sample.sample)
                        }
                        const steps = (step) => step.forEach(e => {
                            const description = e.builtin ? `When run` : e.description
                            const color = e.state !== failed ? grey : red
                            const type = `(${e.type})`
                            toolbox.print.info(`      ${result(e.state)} ${color(description)} ${grey(italic(type))}`)
                            if (e.error) {
                                toolbox.print.info(`\n          ${blue(e.error)} \n`)
                                errorCount++
                            }
                        })
                        steps(sample.givens)
                        if (sample.stage === 'given') continue
                        steps(sample.whens)
                        if (sample.stage === 'when') continue
                        steps(sample.checks)
                    }
                }
            }
        }

        if (errorCount !== 0)
            toolbox.print.info(`\n ${red('Specs finished with some errors:')} ${(errorCount)}  😢 \n`)
        else
            toolbox.print.success('\n  Specs finished with no errors! 🤩 \n')
    }
}



module.exports = cmd
