const { Configuration, OpenAIApi } = require("openai")
const fs = require("fs")
const path = require("path")
const { snakeCase, camelCase, startCase } = require("lodash")
const getToolbox = require("../helpers/toolbox")

const command = {
    name: 'assist',
    alias: ['a'],
    description: 'Assist you to create specs and use cases using AI code generation',
    run: async toolbox => {

        const { colors, print, prompt, template, filesystem, theme } = getToolbox(toolbox)

        const connectedMode = true // if true, it will use the OpenAI API

        try {
            await main()
        } catch (error) {
            print.error(`Error: ${error.message}`)
        }

        async function main() {

            print.cls()
            print.info(`\n${theme.intro('Welcome to Herbs 🌿 Assist 🤖')} (${colors.trap('beta')} version)\n`)

            const hasAPIKeys = hasOpenAIKeys()

            print.info(`We will guide you to generate a new Spec and Use Case based on your domain.\n`)

            print.info(`These will be the steps:`)
            print.info(`    ➊  Use Case name`)
            print.info(`    ➋  Natural Language Scenarios`)
            print.info(`    ➌  Spec file`)
            print.info(`    ➍  Use Case file`)

            print.info(`\nLet's start!\n`)

            await prompt.pressAnyKey()

            // Step 1: Use Case name
            const { usecaseName, usecaseGroup } = await askForUseCaseInfo()

            // Step 2: Natural Language Scenarios
            const { scenarios } = await generateScenarios({ usecaseName, usecaseGroup })

            // Step 3: Spec file
            const { spec } = await generateSpec({ usecaseName, usecaseGroup, scenarios })

            // Step 4: Use Case file
            const { usecase } = await generateUsecase({ usecaseName, usecaseGroup, spec })

            print.info('Your spec and use case are ready to use!\n')
            print.info('Thank you for using Herbs Assist 🤖\n')
        }

        async function askForUseCaseInfo() {

            async function askForUsecaseName() {
                print.cls()
                print.info(theme.title(`➊  Use Case Name\n`))

                print.info(`Let's start by defining the name of your use case.`)
                print.info(`For example: ${colors.italic('Change Customer Address')}, ${colors.italic('Create Reservation')}, ${colors.italic('Get Customer Balance')}, etc.\n`)

                const { usecaseName } = await prompt.ask({
                    type: 'input',
                    name: 'usecaseName',
                    message: 'Use Case Name',
                    initial: 'Withdraw Money',
                    validate: (value) => {
                        if (!value) {
                            return 'Please, inform a usecase name'
                        }
                        return true
                    },
                    footer: 'Tip: It should start with a verb in the present tense'
                })

                return usecaseName
            }

            async function askForUsecaseGroup() {

                function getUsecaseGroups() {
                    // create the path name
                    const usecasesPath = path.join(process.cwd(), 'src', 'domain', 'usecases')

                    // check if the path exists
                    if (!fs.existsSync(usecasesPath)) {
                        throw Error(`The path ${usecasesPath} does not exist`)
                    }

                    // retrive all subdirectories names, excluding files from usecases folder
                    const groups = fs.readdirSync(usecasesPath, { withFileTypes: true })
                        .filter(dirent => dirent.isDirectory())
                        .map(dirent => ({ name: dirent.name, message: `${startCase(snakeCase(dirent.name))} - ${theme.source('src/domain/usecases/' + dirent.name)}`, value: dirent.name }))

                    // add a option to create a new group
                    groups.push({ name: "new", message: "[Create a new group]", value: "[new]" })
                    return groups
                }

                const usecaseGroups = getUsecaseGroups()

                print.info(`\nBefore we move on, we need to know in which group your use case belongs to.\n`)
                // print.info(`\nNow, we need to know in which group your use case belongs.\n`)

                let { usecaseGroup } = await prompt.ask({
                    type: 'autocomplete',
                    name: 'usecaseGroup',
                    message: 'Use Case Group:',
                    limit: 6,
                    choices: usecaseGroups,
                    footer: `\nUse ↑ ↓ to navigate. Press ${theme.source('<enter>')} to select.`
                })

                if (usecaseGroup === "[new]") {
                    const anwser = await prompt.ask({
                        type: 'input',
                        name: 'newUsecaseGroup',
                        message: 'New Use Case Group:',
                        footer() {
                            return `This will create a new folder in ${theme.source('src/domain/usecases')}`
                        },
                        validate: (value) => {
                            if (value.length > 0) return true
                            return 'Type a valid name'
                        }
                    })
                    usecaseGroup = anwser.newUsecaseGroup
                }

                return usecaseGroup
            }

            const usecaseName = await askForUsecaseName()
            const usecaseGroup = await askForUsecaseGroup()
            return { usecaseName, usecaseGroup }
        }

        async function generateScenarios({ usecaseName, usecaseGroup }) {

            print.cls()
            print.info(theme.title(`➋  Natural Language Scenarios\n`))
            print.info(`We are going to generate an initial set of scenarios for your use case.`)

            print.info('\n⏰ Generating Scenarios... (this may take a while)')

            // prepare AI prompt for the scenarios
            const scenariosPrompt = `assist/tmp/scenarios.codex`
            const scenariosPromptReturn = `assist/tmp/scenarios.codex.return`

            template.generate({
                template: 'assist/scenarios.md.codex.ejs',
                target: scenariosPrompt,
                props: { usecaseName, usecaseGroup: startCase(snakeCase(usecaseGroup)) },
            })

            // generate the scenarios
            const codexPrompt = fs.readFileSync(scenariosPrompt, 'utf8')
            const response = connectedMode ?
                await generateOpenAIFile({ tmpFileName: scenariosPromptReturn, codexPrompt }) :
                fs.readFileSync(scenariosPromptReturn, 'utf8') // fake generated file
            let scenarios = parseResponse(response)

            // save the scenarios in a user friendly format
            const scenarioMarkdownFile = path.join(process.cwd(), 'assist', 'scenarios.md')
            template.generate({
                template: 'assist/scenarios.md.ejs',
                target: scenarioMarkdownFile,
                props: { usecaseName, scenarios }
            })

            print.info(`\n✅ Scenarios generated! Now you can review the scenarios and make any changes you want.`)
            print.info(`The next step will be to generate the spec file based on the scenarios.`)

            while (true) {

                scenarios = await fs.readFileSync(scenarioMarkdownFile, 'utf8')

                print.info(`\n${colors.bold('Scenarios:')} ${theme.source(scenarioMarkdownFile)}\n`)
                const { reloadScenario } = await prompt.ask({
                    type: 'select',
                    name: 'reloadScenario',
                    message: 'What do you want to do?',
                    choices: ['Reload File', 'Continue'],
                    footer: `\nUse ↑ ↓ to navigate. Press ${theme.source('<enter>')} to select.`
                })

                if (reloadScenario === 'Continue') break
            }

            return { scenarios }
        }

        async function generateSpec({ usecaseName, usecaseGroup, scenarios }) {
            print.cls()
            print.info(theme.title(`➌  Spec file\n`))
            print.info(`With the scenarios generated, we can now generate a Spec file for you.`)

            print.info('\n⏰ Generating Spec file... (this may take a while)')

            // prepare AI prompt for the spec
            const specPrompt = `assist/tmp/spec.codex`
            const specPromptReturn = `assist/tmp/spec.codex.return`

            template.generate({
                template: 'assist/spec.codex.ejs',
                target: specPrompt,
                props: { scenarios },
            })

            // generate the spec
            const codexPrompt = fs.readFileSync(specPrompt, 'utf8')
            const response = connectedMode ?
                await generateOpenAIFile({ tmpFileName: specPromptReturn, codexPrompt }) :
                fs.readFileSync(specPromptReturn, 'utf8') // fake generated file
            let spec = parseResponse(response)

            // save the spec 
            const specPath = path.normalize(`${filesystem.cwd()}/src/domain/usecases/${camelCase(usecaseGroup)}/${camelCase(usecaseName)}.spec.js`)

            template.generate({
                template: 'assist/spec.ejs',
                target: specPath,
                props: { spec },
            })

            print.info(`\n✅ Spec generated! Please review the spec file and make any changes you want.`)
            print.info(`The next step will be to generate the use case file based on this spec file.`)

            while (true) {

                spec = await fs.readFileSync(specPath, 'utf8')

                print.info(`\n${colors.bold('Spec file:')} ${theme.source(specPath)}\n`)
                const { reloadSpec } = await prompt.ask({
                    type: 'select',
                    name: 'reloadSpec',
                    message: 'What do you want to do?',
                    choices: ['Reload File', 'Continue'],
                    footer: `\nUse ↑ ↓ to navigate. Press ${theme.source('<enter>')} to select.`
                })

                if (reloadSpec === 'Continue') break
            }

            return { spec }
        }

        async function generateUsecase({ usecaseName, usecaseGroup, spec }) {

            print.cls()
            print.info(theme.title(`➍  Usecase file\n`))
            print.info(`With the spec file generated, we can now generate a Use Case file for you.`)

            print.info('\n⏰ Generating Use Case file... (this may take a while)')

            // prepare AI prompt for the use case 
            const usecasePrompt = `assist/tmp/usecase.codex`
            const usecasePromptReturn = `assist/tmp/usecase.codex.return`

            template.generate({
                template: 'assist/usecase.codex.ejs',
                target: usecasePrompt,
                props: { spec },
            })

            // generate the use case
            const codexPrompt = fs.readFileSync(usecasePrompt, 'utf8')
            const response = connectedMode ?
                await generateOpenAIFile({ tmpFileName: usecasePromptReturn, codexPrompt }) :
                fs.readFileSync(usecasePromptReturn, 'utf8') // fake generated file
            let usecase = parseResponse(response)

            // save the use case
            const usecasePath = path.normalize(`${filesystem.cwd()}/src/domain/usecases/${camelCase(usecaseGroup)}/${camelCase(usecaseName)}.js`)
            template.generate({
                template: 'assist/usecase.ejs',
                target: usecasePath,
                props: { usecase },
            })

            print.info(`\n✅ Use Case generated!`)

            print.info(`\n${colors.bold('Use Case file:')} ${theme.source(usecasePath)}\n`)

            return { usecase }

        }

        function hasOpenAIKeys() {
            // verify is organization and api key are set
            const { HERBS_OPENAI_ORG_ID, HERBS_OPENAI_API_KEY } = process.env
            if (!HERBS_OPENAI_ORG_ID || !HERBS_OPENAI_API_KEY) {
                print.error('Herbs Assist uses Codex OpenAI API to generate code, but it seems that you didn\'t set your organization and api key yet.')
                print.error('You need to set the environment variables HERBS_OPENAI_ORG_ID and HERBS_OPENAI_API_KEY')
                print.info('\nbash:')
                print.info('    export HERBS_OPENAI_ORG_ID=org-xxxxxxxx')
                print.info('    export HERBS_OPENAI_API_KEY=sk-xxxxxxxx')
                print.info('\nPS:')
                print.info('    $env:HERBS_OPENAI_ORG_ID="org-xxxxxxxx"')
                print.info('    $env:HERBS_OPENAI_API_KEY="sk-xxxxxxxx"')
                print.info('\nIn other to get your API key, access https://beta.openai.com/docs/guides/code \n')
                throw Error('OpenAI keys not set')
            }
        }

        async function generateOpenAIFile({
            model = "code-davinci-002",
            codexPrompt,
            temperature = 0.3,
            max_tokens = 3000,
            top_p = 1,
            best_of = 1,
            frequency_penalty = 0.04,
            presence_penalty = 0.01,
            stop = ["END"],
            tmpFileName }) {

            const { HERBS_OPENAI_ORG_ID, HERBS_OPENAI_API_KEY } = process.env
            const configuration = new Configuration({ organization: HERBS_OPENAI_ORG_ID, apiKey: HERBS_OPENAI_API_KEY })

            const openai = new OpenAIApi(configuration)
            const response = await openai.createCompletion({
                model, prompt: codexPrompt, suffix: "",
                temperature, max_tokens,
                top_p, best_of,
                frequency_penalty, presence_penalty, stop,
            })

            // check if the returned data from openai is valid
            const choices = response.data.choices
            if (!choices || choices.length == 0) throw Error('OpenAI returned an invalid response')

            // check if the data as retrived
            if (choices.length < 1) throw Error('No data retrived from OpenAI')

            // save the pre-processed data
            fs.writeFileSync(tmpFileName, choices[0].text)

            // parse the data retrived
            return choices[0].text
        }


        function parseResponse(codexResponse) {
            const regex = /~~~~([\s\S]*)/gm
            const ret = regex.exec(codexResponse)

            // check if processed spec if valid
            if (ret === null || ret[1].length < 1) throw Error(`It was not possible to parse the response from OpenAI`)

            const response = ret[1]
            return response.trim()
        }
    }
}

module.exports = command
