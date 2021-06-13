module.exports = async ({ generate }) => async () => {
  await generate({
    template: 'infra/api/server.ejs',
    target: `src/infra/api/server.js`
  })
}
