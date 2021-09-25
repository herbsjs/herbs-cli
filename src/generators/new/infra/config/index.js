const { objToString } = require('../../../utils')

module.exports = async ({ template: { generate }, parameters: { options } }) => async () => {
  const requires = {
    isProd: 'env.is(\'production\')',
    api: 'require(\'./api\')'
  }

  await generate({
    template: 'infra/config/api.ejs',
    target: 'src/infra/config/api.js'
  })

  if (options.mongo) {
    await generate({
      template: 'infra/config/mongo.ejs',
      target: 'src/infra/config/mongo.js',
      props: { dbName: options.name }
    })
    requires.database = 'require(\'./mongo\')'
  }
  if (options.postgres) {
    await generate({
      template: 'infra/config/postgres.ejs',
      target: 'src/infra/config/postgres.js'
    })
    requires.database = 'require(\'./postgres\')'
  }

  if (options.sqlserver) {
    await generate({
      template: 'infra/config/sqlserver.ejs',
      target: 'src/infra/config/sqlserver.js'
    })
    requires.database = 'require(\'./sqlserver\')'
  }

  await generate({
    template: 'infra/config/index.ejs',
    target: 'src/infra/config/index.js',
    props: { requires: objToString(requires) }
  })
}
