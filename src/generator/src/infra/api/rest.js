module.exports = async ({ generate }) => async () => {
  await generate({
    template: 'infra/api/rest/index.ejs',
    target: 'src/infra/api/rest/index.js'
  })
}
