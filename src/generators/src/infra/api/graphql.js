module.exports = async ({ template: { generate } }) => async () => {

  process.stdout.write(`Generating GraphQL\n`)

  await generate({
    template: 'infra/api/graphql/mutations.ejs',
    target: 'src/infra/api/graphql/mutations.js'
  })

  await generate({
    template: 'infra/api/graphql/queries.ejs',
    target: 'src/infra/api/graphql/queries.js'
  })

  await generate({
    template: 'infra/api/graphql/types.ejs',
    target: 'src/infra/api/graphql/types.js'
  })

  await generate({
    template: 'infra/api/graphql/inputs.ejs',
    target: 'src/infra/api/graphql/inputs.js'
  })

  await generate({
    template: 'infra/api/graphql/defaultResolver.ejs',
    target: 'src/infra/api/graphql/defaultResolver.js'
  })

  await generate({
    template: 'infra/api/graphql/index.ejs',
    target: 'src/infra/api/graphql/index.js'
  })
}
