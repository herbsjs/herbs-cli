const { Input } = require('enquirer')
const ansiColor = require('ansi-256-colors')

function getToolbox(toolbox) {
    const print = toolbox.print
    const colors = print.colors
    const prompt = toolbox.prompt
    const template = toolbox.template
    const filesystem = toolbox.filesystem
    print.cls = () => { process.stdout.write('\x1Bc') }
    prompt.pressAnyKey = async (message = `Press any ${theme.source('<enter>')} to continue...`) => {
        const prompt = new Input({ name: 'anykey', message })
        prompt.on('keypress', (s, key) => {
            if (key.name === 'return')
                prompt.submit()
        })
        await prompt.run()
    }

    const theme = {
        herbsColor: ansiColor.fg.getRgb(5, 5, 0),
        title: (input) => (theme.herbsColor + input + ansiColor.reset),
        intro: (input) => (theme.herbsColor + colors.bold(input) + ansiColor.reset),
        source: (input) => (colors.italic.gray(input) + ansiColor.reset),
    }

    return { colors, print, prompt, template, filesystem, theme }
}

module.exports = getToolbox