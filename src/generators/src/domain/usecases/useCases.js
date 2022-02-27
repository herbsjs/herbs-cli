const useCases = ['create', 'update', 'delete', 'findAll', 'find']
const { objToString, requireHerbarium } = require('../../../utils')
const pascalCase = require('lodash.startcase')
const camelCase = require('lodash.camelcase')
const fs = require('fs')
const path = require('path')

async function generateRequestschema(schema) {
  // schema to plain JSON
  const obj = Object.keys(schema).reduce((obj, key) => {
    const { name, type } = schema[key]
    if (schema[key] === Function) return obj
    if (name === 'id') return obj
    obj[name] = type.name || type.constructor.name
    return obj
  }, {})

  return objToString(obj, { spaces: 2, removeBraces: true, extraSpaces: 4 })
}

module.exports = async ({ template: { generate }, filesystem }, command) => async () => {

  process.stdout.write(`Generating Use Cases\n`)

  const herbarium = requireHerbarium(command, filesystem.cwd())
  const entities = herbarium.entities.all
  const requires = []

  for (const entity of Array.from(entities.values())) {
    const { name, schema } = entity.entity.prototype.meta
    for (const action of useCases) {
      const useCaseName = `${action} ${name}`
      const ucPath = path.normalize(`${filesystem.cwd()}/src/domain/usecases/${camelCase(name)}/${camelCase(useCaseName)}.js`)

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
          request: await generateRequestschema(schema)
        }
      })
      process.stdout.write(`  New: ${ucPath}\n`)

    }
  }
}
