const { objToString } = require('../../../utils')

module.exports = async ({ template: { generate }, parameters: { options } }) => {
  return async () => {
    const requires = {
      isProd: 'env.is(\'production\')',
      api: 'require(\'./api\')'
    }

    await generate({
      template: 'infra/config/api.ejs',
      target: 'src/infra/config/api.js'
    })

    for (const db of ['postgres', 'mongo', 'sqlserver']) {
      if (!options[db]) continue
      await generate({
        template: `infra/config/${db}.ejs`,
        target: `src/infra/config/${db}.js`
      })
      requires.database = `require('./${db}')`
    }

    await generate({
      template: 'infra/config/index.ejs',
      target: 'src/infra/config/index.js',
      props: { requires: objToString(requires) }
    })
  }
}
