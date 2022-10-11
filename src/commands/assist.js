const { Configuration, OpenAIApi } = require("openai")
const fs = require("fs")
const path = require("path")
const camelCase = require("lodash.camelcase")

const command = {
    name: 'assist',
    alias: ['a'],
    description: 'Assist you to create specs and use cases using AI',
    run: async toolbox => {

        await main()

        async function main() {
            const colors = toolbox.print.colors
            toolbox.print.info(`\n${colors.bold('Welcome to Herbs 🌿 Assist 🤖')} (${colors.trap('alpha')} version)\n`)

            const hasAPIKeys = hasOpenAIKeys()
            if (hasAPIKeys instanceof Error) return hasAPIKeys

            toolbox.print.info(`We will guide you to generate a new spec and use case based on your domain.\n`)
            toolbox.print.info(`The magic is about to begin...`)

            const usecaseName = await getUsecaseName()
            const usecaseGroup = await getUsecaseGroup()

            const { code } = await generateSpecFile({ usecaseGroup, usecaseName })

            toolbox.print.info(`Now you can review the generated spec and make any changes you want.`)
            toolbox.print.info(`Based on the spec, we will generate a use case for you.`)
            const { confirm } = await toolbox.prompt.ask({
                type: 'confirm',
                name: 'confirm',
                message: 'Can we continue?',
                initial: true,
            })

            if (!confirm) {
                toolbox.print.info('\nOk, bye!\n')
                return
            }

            await generateUsecaseFile({ usecaseGroup, usecaseName, specCode: code })

            toolbox.print.info('Your spec and use case are ready to use!')
            toolbox.print.info('Thank you for using Herbs Assist 🤖\n')
        }

        async function generateSpecFile({ usecaseName, usecaseGroup }) {

            const colors = toolbox.print.colors
            toolbox.print.info(`\n${colors.bold('🔶 Scenarios Definition')}\n`)

            //create file if not exists
            const specDefPath = path.join(process.cwd(), 'assist', 'spec.md')
            if (!fs.existsSync(specDefPath)) {

                toolbox.template.generate({
                    template: 'assist/spec.md.ejs',
                    target: specDefPath,
                    props: { usecaseName }
                })
                toolbox.print.info(`${colors.bold('First time here, right?')}`)
                toolbox.print.info(`We created a file where you can define your scenarios. Please, review it and come back here.`)
                toolbox.print.info(`\nHere is the path: ${specDefPath}\n`)
            }
            else
                toolbox.print.info(`Spec file: ${specDefPath}\n`)

            let scenarios = fs.readFileSync(specDefPath, 'utf8')

            while (true) {
                toolbox.print.info(`This is what is defined so far:\n`)
                scenarios = fs.readFileSync(specDefPath, 'utf8')
                toolbox.print.info(colors.italic.gray(scenarios) + `\n`)
                const { confirm } = await toolbox.prompt.ask({
                    type: 'confirm',
                    name: 'confirm',
                    message: 'Reload?',
                    footer: `After you confirm, we will generate the "${camelCase(usecaseName)}.spec.js" file based on your input.`,
                    initial: false,
                })
                if (!confirm) break
            }


            const specPrompt = `tmp/spec.codex`
            const specPromptReturn = `tmp/spec.codex.return`

            toolbox.template.generate({
                template: 'assist/spec.codex.ejs',
                target: specPrompt,
                props: { usecaseName, scenarios },
            })

            const prompt = fs.readFileSync(specPrompt, 'utf8')

            toolbox.print.info(`\n${colors.bold('🔶 Herbs Spec - Generation and Review')}`)
            toolbox.print.info('\n⏰ Generating spec file... (this may take a while)')
            const response = await generateOpenAIFile({ tmpFileName: specPromptReturn, prompt })
            // const response = fs.readFileSync(specPromptReturn, 'utf8') // fake generated file
            if (response instanceof Error) return response

            const code = parseResponse(response)
            if (code instanceof Error) return code

            const filesystem = toolbox.filesystem
            const specPath = path.normalize(`${filesystem.cwd()}/src/domain/usecases/${camelCase(usecaseGroup)}/${camelCase(usecaseName)}.spec.js`)

            toolbox.template.generate({
                template: 'assist/spec.ejs',
                target: specPath,
                props: { code },
            })
            toolbox.print.info(`\nSpec created: ${specPath}\n`)
            return { code }
        }

        async function generateUsecaseFile({ usecaseName, usecaseGroup, specCode }) {
            const usecasePrompt = `tmp/usecase.codex`
            const usecasePromptReturn = `tmp/usecase.codex.return`
            
            toolbox.template.generate({
                template: 'assist/usecase.codex.ejs',
                target: usecasePrompt,
                props: { usecaseName, specCode },
            })
            
            const colors = toolbox.print.colors
            const prompt = fs.readFileSync(usecasePrompt, 'utf8')
            toolbox.print.info(`\n${colors.bold('🔶 Herbs Use Case')}`)
            toolbox.print.info('\n⏰ Generating use case file... (this may take a while)')
            const response = await generateOpenAIFile({ tmpFileName: usecasePromptReturn, prompt })
            // const response = fs.readFileSync(usecasePromptReturn, 'utf8') // fake generated file
            if (response instanceof Error) return response

            const code = parseResponse(response)
            if (code instanceof Error) return code

            const filesystem = toolbox.filesystem
            const usecasePath = path.normalize(`${filesystem.cwd()}/src/domain/usecases/${camelCase(usecaseGroup)}/${camelCase(usecaseName)}.js`)

            toolbox.template.generate({
                template: 'assist/usecase.ejs',
                target: usecasePath,
                props: { code },
            })

            toolbox.print.info(`\nUse case created: ${usecasePath}\n`)
        }

        function parseResponse(response) {
            const regex = /~~~~([\s\S]*?)~~~~/gm
            const ret = regex.exec(response)

            // check if processed spec if valid
            if (ret[1].length < 1) {
                toolbox.print.error(`Spec not generated duo to parsing error`)
                return Error(`Spec not generated duo to parsing error`)
            }

            const code = ret[1]
            return code
        }

        async function generateOpenAIFile({
            model = "code-davinci-002",
            prompt,
            temperature = 0.3,
            max_tokens = 2000,
            top_p = 1,
            best_of = 3,
            frequency_penalty = 0.04,
            presence_penalty = 0.01,
            stop = ["END"],
            tmpFileName }) {

            const openai = getOpenAI()

            const response = await openai.createCompletion({
                model, prompt, suffix: "",
                temperature, max_tokens,
                top_p, best_of,
                frequency_penalty, presence_penalty, stop,
            })

            // check if the returned data from openai is valid
            const choices = response.data.choices
            if (!choices || choices.length == 0) {
                toolbox.print.error('OpenAI returned an invalid response')
                return Error('OpenAI returned an invalid response')
            }

            // check if the data as retrived
            if (choices.length < 1) {
                toolbox.print.error('No data retrived from OpenAI')
                return Error('No data retrived from OpenAI')
            }

            // save the pre-processed data
            fs.writeFileSync(tmpFileName, choices[0].text)

            // parse the data retrived
            return choices[0].text
        }

        function hasOpenAIKeys() {
            // verify is organization and api key are set
            const { HERBS_OPENAI_ORG_ID, HERBS_OPENAI_API_KEY } = process.env
            if (!HERBS_OPENAI_ORG_ID || !HERBS_OPENAI_API_KEY) {
                toolbox.print.error('\nHerbs Assist uses OpenAI API to generate code, but it seems that you didn\'t set your organization and api key yet.')
                toolbox.print.error('You need to set the environment variables HERBS_OPENAI_ORG_ID and HERBS_OPENAI_API_KEY')
                toolbox.print.info('\nbash:')
                toolbox.print.info('export HERBS_OPENAI_ORG_ID=org-xxxxxxxx')
                toolbox.print.info('export HERBS_OPENAI_API_KEY=sk-xxxxxxxx')
                toolbox.print.info('\nPS:')
                toolbox.print.info('$env:HERBS_OPENAI_ORG_ID="org-xxxxxxxx"')
                toolbox.print.info('$env:HERBS_OPENAI_API_KEY="sk-xxxxxxxx"')
                toolbox.print.info('\nIn other to get your API key, access https://openai.com/blog/openai-codex/ \n')
                return Error('OpenAI keys not set')
            }
        }

        function getOpenAI() {

            const { HERBS_OPENAI_ORG_ID, HERBS_OPENAI_API_KEY } = process.env

            const configuration = new Configuration({
                organization: HERBS_OPENAI_ORG_ID,
                apiKey: HERBS_OPENAI_API_KEY
            })

            const openai = new OpenAIApi(configuration)
            return openai
        }

        async function getUsecaseName() {

            const colors = toolbox.print.colors
            toolbox.print.info(`\n${colors.bold('🔶 Use Case Definition')}\n`)
            toolbox.print.info(`First, we need to know what is your use case name`)
            toolbox.print.info(`For example: ${colors.bold('Change Customer Address')}, ${colors.bold('Create Reservation')}, ${colors.bold('Get Customer Balance')}, etc.\n`)

            const { usecaseName } = await toolbox.prompt.ask({
                type: 'input',
                name: 'usecaseName',
                message: 'Use Case Name',
                initial: 'ex: Withdraw Money',
                validate: (value) => {
                    if (!value) {
                        return 'Please, inform a usecase name'
                    }
                    return true
                },
                footer: 'The name of the use case that you want to create'
            })

            return usecaseName
        }

        async function getUsecaseGroup() {

            function getUsecaseGroups() {
                // create the path name
                const usecasesPath = path.join(process.cwd(), 'src', 'domain', 'usecases')

                // check if the path exists
                if (!fs.existsSync(usecasesPath)) {
                    toolbox.print.error(`The path ${usecasesPath} does not exist`)
                    return Error(`The path ${usecasesPath} does not exist`)
                }

                // retrive all subdirectories names, excluding files from usecases folder
                const groups = fs.readdirSync(usecasesPath, { withFileTypes: true })
                    .filter(dirent => dirent.isDirectory())
                    .map(dirent => ({ name: dirent.name, message: `usecases/${dirent.name}`, value: dirent.name }))

                // add a option to create a new group
                groups.push({ name: "new", message: "[Create a new group]", value: "[new]" })
                return groups
            }

            const usecaseGroups = getUsecaseGroups()
            if (usecaseGroups instanceof Error) return

            toolbox.print.info(`\nNow, we need to know in which group your use case belongs.\n`)

            let { usecaseGroup } = await toolbox.prompt.ask({
                type: 'autocomplete',
                name: 'usecaseGroup',
                message: 'Use Case Group:',
                limit: 6,
                choices: usecaseGroups,
                footer: 'The group of the use case that you want to create'
            })

            if (usecaseGroup === "[new]") {
                const anwser = await toolbox.prompt.ask({
                    type: 'input',
                    name: 'newUsecaseGroup',
                    message: 'New Use Case Group:',
                    footer() {
                        return colors.dim('(Type the name of the new group)')
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


    }

}

module.exports = command
