module.exports = async ({ template: { generate }, parameters: { options: { mongo = false, postgres = false } } }) => async () => {
  if (mongo) {
    await generate({
      template: 'data/database/mongo/database.ejs',
      target: 'src/infra/data/database/index.js'
    })
  }
  if (postgres) {
    await generate({
      template: 'data/database/postgres/database.ejs',
      target: 'src/infra/data/database/index.js'
    })
  }
}
