module.exports = async ({ generate }) => async () => {
  await generate({
    template: 'index.ejs',
    target: `src/index.js`
  })
}
