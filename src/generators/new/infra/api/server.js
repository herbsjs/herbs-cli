module.exports = async ({ template: { generate }, parameters: { options } }) => async () => {
  await generate({
    template: 'infra/api/server.ejs',
    target: 'src/infra/api/server.js',
    props: { ...options }
  })
}
