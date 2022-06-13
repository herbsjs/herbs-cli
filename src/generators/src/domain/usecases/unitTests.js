const camelCase = require('lodash.camelcase')
const { objToString, requireHerbarium } = require('../../../utils')
const fs = require('fs')
const path = require('path')
const { usingMongo } = require('../../../utils')

function invertObjValues(obj) {
  for (const key of Object.keys(obj)) {
    switch (typeof obj[key]) {
      case 'String':
        obj[key] = 123
        break
      case 'Number':
      case 'Boolean':
        obj[key] = '123'
        break
      default:
        obj[key] = true
    }
  }
  return obj
}
const removeID = (obj) => {
  delete obj.id
  return obj
}

const validUseCaseRequests = {
  create: removeID,
  update: (obj) => obj,
  delete: (obj) => { return { id: obj.id } },
  find: (obj) => { return { ids: obj.id } },
  findAll: (obj) => { return [obj, obj, obj] }
}
const invalidUseCaseRequests = {
  create: (obj) => {
    delete obj.id
    obj = invertObjValues(obj)
    return obj
  },
  update: (obj) => invertObjValues(obj),
  delete: () => { return { id: null } },
  find: () => { return { ids: null } },
  findAll: () => { return [] }
}

const useCases = Object.keys(validUseCaseRequests)

const valueType = {
  String: "'a text'",
  Number: 99,
  Boolean: true,
  Array: []
}

function generateMockObj(schema) {
  const obj = {}
  for (const key of Object.keys(schema)) {
    obj[key] = valueType[schema[key].type.name]
  }
  return obj
}

function generateRequestObject(schema, action, validReq = true) {
  const obj = generateMockObj(schema)
  if (validReq) return validUseCaseRequests[action](obj)
  return invalidUseCaseRequests[action](obj)
}

module.exports = async ({ template: { generate }, filesystem }, command) => async () => {

  process.stdout.write(`Generating Use Cases Tests\n`)

  const herbarium = requireHerbarium(command, filesystem.cwd())
  const entities = herbarium.entities.all

  for (const entity of Array.from(entities.values())) {
    const { name, schema } = entity.entity.prototype.meta

    // herbs specs
    for (const action of useCases) {
      const useCaseName = `${action} ${name}`
      const ucPath = path.normalize(`${filesystem.cwd()}/src/domain/usecases/${camelCase(name)}/${camelCase(useCaseName)}.spec.js`)

      if (fs.existsSync(ucPath)) return

      const objOptions = { spaces: 4, extraSpaces: 4, removeBraces: true }
      await generate({
        template: `domain/useCases/tests/${action}.spec.ejs`,
        target: ucPath,
        props: {
          name: {
            pascalCase: name,
            camelCase: camelCase(name),
            raw: camelCase(name).replace(/([a-z0-9])([A-Z])/g, '$1 $2')
          },
          request: {
            valid: objToString(generateRequestObject(schema, action), objOptions),
            invalid: objToString(generateRequestObject(schema, action, false), objOptions)
          },
          mock: objToString(generateMockObj(schema), objOptions),
          mongo: usingMongo(filesystem.cwd())
        }
      })
      process.stdout.write(`  New: ${ucPath}\n`)

    }
  }
}
