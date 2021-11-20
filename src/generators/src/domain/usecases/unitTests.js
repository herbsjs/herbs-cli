
const camelCase = require('lodash.camelcase')
const { objToString } = require('../../../utils')
const fs = require('fs')

function invertObjValues (obj) {
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
  getById: removeID,
  getAll: (obj) => { return [ obj, obj, obj ] }
}
const invalidUseCaseRequests = {
  create: (obj) => {
    delete obj.id
    obj = invertObjValues(obj)
    return obj
  },
  update: (obj) => invertObjValues(obj),
  delete: () => { return { id: null } },
  getById: () => { return { id: null } },
  getAll: () => { return [] }
}

const useCases = Object.keys(validUseCaseRequests)

const valueType = {
  String: "'a text'",
  Number: 99,
  Boolean: true,
  Array: []
}

function generateMockObj (schema) {
  const obj = {}
  for (const key of Object.keys(schema)) {
    obj[key] = valueType[schema[key].type.name]
  }
  return obj
}

function generateRequestObject (schema, action, validReq) {
  const obj = generateMockObj(schema)
  if (validReq) return validUseCaseRequests[action](obj)
  return invalidUseCaseRequests[action](obj)
}

module.exports = async ({ template: { generate }, filesystem }) => async () => {
  const entities = require(`${filesystem.cwd()}/src/domain/entities`)

  for (const entity of Object.keys(entities)) {
    const { name, schema } = entities[entity].prototype.meta
    for (const action of useCases) {
      const useCaseName = `${action}${name}`
      const ucPath = `${filesystem.cwd()}/src/domain/usecases/${camelCase(name)}/${useCaseName}.test.js`

      if (fs.existsSync(ucPath)) continue

      await generate({
        template: `domain/useCases/tests/${action}.test.ejs`,
        target: ucPath,
        props: {
          name: {
            pascalCase: name,
            camelCase: camelCase(name),
            raw: camelCase(name).replace(/([a-z0-9])([A-Z])/g, '$1 $2')
          },
          request: {
            valid: objToString(generateRequestObject(schema, action, true)),
            invalid: objToString(generateRequestObject(schema, action, false))
          },
          mock: objToString(generateRequestObject(schema, action))
        }
      })
    }
  }
}
