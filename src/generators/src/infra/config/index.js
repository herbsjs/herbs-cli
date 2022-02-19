const { objToString } = require('../../../utils')

module.exports = async ({ template: { generate }, parameters: { options } }) => {
  return async () => {

    process.stdout.write(`Generating Config\n`)

    const requires = {
      isProd: 'env.is(\'production\')',
      api: 'require(\'./api\')'
    }

    await generate({
      template: 'infra/config/api.ejs',
      target: 'src/infra/config/api.js'
    })

    const db = options.database

    await generate({
      template: `infra/config/${db}.ejs`,
      target: `src/infra/config/${db}.js`,
      props: { dbName: options.name }
    })
    requires.database = `require('./${db}')`

    await generate({
      template: `${db.toLowerCase()}.knexFile.ejs`,
      target: 'knexFile.js',
      props: { dbName: options.name }
    })

    await generate({
      template: 'infra/config/index.ejs',
      target: 'src/infra/config/index.js',
      props: { requires: objToString(requires) }
    })

  }
}
