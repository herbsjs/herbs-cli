const camelCase = require('lodash.camelcase')
const { objToString } = require('../../utils')

const requireRoute = (type, entityName, useId = false) => `{ usecase: require('../../../domain/usecases/${camelCase(entityName)}/${type}${entityName}')(repositories)${useId ? ', id: \'id\'' : ''}}`

module.exports = async ({ template: { generate }, filesystem }) => async () => {
  const usecases = require(`${filesystem.cwd()}/src/domain/usecases`)

  // groupBy tags
  const ucByTag = usecases.reduce((acc, d) => {
    if (Object.keys(acc).includes(d.tags.group)) return acc
    acc[d.tags.group] = usecases.filter(g => g.tags.group === d.tags.group)
    return acc
  }, {})
  const routes = []
  for (const tag of Object.keys(ucByTag)) {
    const route = {
      name: `'${camelCase(tag)}'`
    }
    for (const obj of ucByTag[tag]) {
      const ucDescription = obj.usecase({})().description
      const entityName = tag.slice(0, -1)
      if (ucDescription.includes('Create')) route.post = requireRoute('create', entityName)
      if (ucDescription.includes('Find')) route.getById = requireRoute('getById', entityName, true)
      if (ucDescription.includes('FindAll')) route.getAll = requireRoute('getAll', entityName)
      if (ucDescription.includes('Update')) route.put = requireRoute('update', entityName)
      if (ucDescription.includes('Delete')) route.delete = requireRoute('delete', entityName)
    }
    routes.push(route)
  }

  await generate({
    template: 'infra/api/rest/index.ejs',
    target: 'src/infra/api/rest/index.js',
    props: { routes: objToString(routes) }
  })
}
