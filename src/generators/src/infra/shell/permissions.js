module.exports = async ({ template: { generate } }) => async () => {
  process.stdout.write(`Generating File Permissions\n`)

  await generate({
    template: 'infra/shell/permissions.ejs',
    target: 'src/infra/shell/permissions.js'
  })
}
