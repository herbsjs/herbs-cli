module.exports = async ({ template: { generate }, parameters: { options } }) => async () => {
  
  process.stdout.write(`Generating Server\n`)
  
  await generate({
    template: 'infra/api/server.ejs',
    target: 'src/infra/api/server.js',
    props: { ...options }
  })

  await generate({
    template: 'infra/api/auth.ejs',
    target: 'src/infra/api/auth.js',
  })
}
