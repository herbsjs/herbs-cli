module.exports = async ({ template: { generate } }) => async () => {
  await generate({
    template: 'index.ejs',
    target: 'src/index.js'
  })
}
