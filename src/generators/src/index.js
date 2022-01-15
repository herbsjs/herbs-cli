module.exports = async ({ template: { generate } }) => async () => {
  process.stdout.write(`Generating Index\n`)

  await generate({
    template: 'index.ejs',
    target: 'src/index.js'
  })
}
