module.exports = async ({ template: { generate } }) => async () => {
    process.stdout.write(`Generating Log\n`)
  
    await generate({
      template: 'infra/log/api.ejs',
      target: 'src/infra/log/api.js'
    })
  }
  