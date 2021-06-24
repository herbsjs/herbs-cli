module.exports = async ({ generate, options }) => async () => {
  console.log(options)
  await generate({
    template: 'infra/api/server.ejs',
    target: `src/infra/api/server.js`,
    props: { ...options }
  })
}
