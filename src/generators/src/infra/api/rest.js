module.exports = async ({ template: { generate }, filesystem }) => async () => {

  process.stdout.write(`Generating REST\n`)

  await generate({
    template: 'infra/api/rest/index.ejs',
    target: 'src/infra/api/rest/index.js',
  })

  await generate({
    template: 'infra/api/rest/controller.ejs',
    target: 'src/infra/api/rest/controller.js',
  })

}
