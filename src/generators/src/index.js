module.exports = async ({ template: { generate } }) => async () => {
  process.stdout.write(`Generating Index: `)

  await generate({
    template: 'index.ejs',
    target: 'src/index.js'
  })
  // eslint-disable-next-line no-console
  console.info(`ok`)
}
