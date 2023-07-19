const { objToString } = require('../../../utils')

module.exports = async ({ template: { generate }, parameters: { options } }) => {
  return async () => {

    process.stdout.write(`Generating Config\n`)

    const requires = {
      isProd: 'env.is(\'production\')',
      api: 'require(\'./api\')'
    }

    const uuid = require('uuid')
    const jwtSecret = `${uuid.v4()}${uuid.v4()}`

    await generate({
      template: 'infra/config/api.ejs',
      target: 'src/infra/config/api.js',
      props: { jwtSecret, ...options }
    })

    const db = options.database

    await generate({
      template: `infra/config/${db}.ejs`,
      target: `src/infra/config/${db}.js`,
      props: { dbName: options.name }
    })
    requires.database = `require('./${db}')`
    if(db !== 'mongo')
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
