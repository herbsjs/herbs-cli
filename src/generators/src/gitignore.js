module.exports = async ({ template: { generate } }) => async () => {
    process.stdout.write(`Generating GitIgnore\n`)

    await generate({
        template: 'infra/config/.gitignore.ejs',
        target: '.gitignore',
    })
}


