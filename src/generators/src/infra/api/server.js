module.exports = async ({ template: { generate }, parameters: { options } }) => async () => {
  
  process.stdout.write(`Generating Server: `)
  
  await generate({
    template: 'infra/api/server.ejs',
    target: 'src/infra/api/server.js',
    props: { ...options }
  })

  // eslint-disable-next-line no-console
  console.info(`ok`)
}
