module.exports = async ({ template: { generate } }) => async () => {
  process.stdout.write(`Generating Readme\n`)

  await generate({
    template: 'readme.ejs',
    target: 'readme.md'
  })
}
