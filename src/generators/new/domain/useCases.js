const useCases = ['create', 'update', 'delete', 'getById']
const { objToString, pascalCase } = require('../../utils')
const camelCase = require('lodash.camelcase')
const fs = require('fs')

async function generateRequest (schema) {
  // schema to plain JSON
  const obj = Object.keys(schema).reduce((obj, key) => {
    const { name, type } = schema[key]
    if (schema[key] === Function) return obj
    if (name === 'id') return obj
    obj[name] = type.name || type.constructor.name
    return obj
  }, {})

  // convert plain JSON and remove quotation marks(")
  const str = JSON.stringify(obj, null, 8)
    .replace(/"/g, '')
    .split('\n')

  // remove first and last lines
  str.shift()
  str.pop()

  return str.join('\n').trim()
}

module.exports = async ({ template: { generate }, filesystem }) => async () => {
  const entities = require(`${filesystem.cwd()}/src/domain/entities`)
  const requires = []

  for (const entity of Object.keys(entities)) {
    const { name, schema } = entities[entity].prototype.meta
    for (const action of useCases) {
      const useCaseName = `${action}${name}`
      const ucPath = `${filesystem.cwd()}/src/domain/usecases/${camelCase(name)}/${camelCase(useCaseName)}.js`

      let type = 'read'
      for (const t of ['create', 'update', 'delete']) {
        if (useCaseName.includes(t)) type = t
      }

      requires.push(`{ usecase: require('./${camelCase(name)}/${useCaseName}'), tags: { group: '${name}s', type: '${type}'} }`)

      if (fs.existsSync(ucPath)) continue

      await generate({
        template: `domain/useCases/${action}.ejs`,
        target: ucPath,
        props: {
          name: {
            raw: name,
            pascalCase: pascalCase(name),
            camelCase: camelCase(name)
          },
          request: await generateRequest(schema)
        }
      })
    }
  }

  await generate({
    template: 'domain/useCases/index.ejs',
    target: 'src/domain/usecases/index.js',
    props: { requires: objToString(requires) }
  })
}
