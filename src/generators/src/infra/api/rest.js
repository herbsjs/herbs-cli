const camelCase = require('lodash.camelcase')
const { objToString } = require('../../../utils')
const { herbarium } = require('@herbsjs/herbarium')

const requireRoute = (type, entityName, useId = false) =>
  `{ usecase: require('../../../domain/usecases/${camelCase(entityName)}/${type}${entityName}')(repositories)${useId ? ', id: \'id\'' : ''}}`

module.exports = async ({ template: { generate }, filesystem }) => async () => {

  process.stdout.write(`Generating REST\n`)

  await generate({
    template: 'infra/api/rest/index.ejs',
    target: 'src/infra/api/rest/index.js',
  })
}
