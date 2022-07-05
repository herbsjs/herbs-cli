module.exports = async ({ template: { generate } }) => async () => {

  process.stdout.write(`Generating GraphQL\n`)

  await generate({
    template: 'infra/api/graphql/index.ejs',
    target: 'src/infra/api/graphql/index.js'
  })
}
