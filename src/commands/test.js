const glob = require('glob')
const path = require('path')

const cmd = {
    name: 'test',
    description: 'Run Herbs spec tests',
    alias: ['t'],
    run: async toolbox => {

        const files = glob.sync('./**/*.aloe.test.js')
        for (const file of files) {
            const instance = require(path.resolve(file))
            if (instance.isSpec) {
                const ret = await instance.run()
                console.log(ret, instance)
            }
        }
        toolbox.print.success('Test finished! 🤩')
    }
}



module.exports = cmd
