
const camelCase = require('lodash.camelcase')
const { objToString } = require('../../../utils')
const fs = require('fs')

function invertObjValues(obj){
  for(const key of Object.keys(obj)){
    switch (typeof obj[key]) {
      case 'String':
        obj[key] = 123 
        break;
      case 'Number':
      case 'Boolean':
        obj[key] = '123'
        break;
      default:
        obj[key] = true
    }
  }
  return obj
}

const validUseCaseRequests = {
  create: (obj) => {
    delete obj.id
    return obj
  },
  update: (obj) => obj,
  delete: (obj) => { return { id: obj.id } },
  getById: (obj) => { return { id: obj.id } }
}
const invalidUseCaseRequests = {
  create: (obj) => {
    delete obj.id
    obj = invertObjValues(obj)
    return obj
  },
  update: (obj) => invertObjValues(obj),
  delete: () => { return { id: null } },
  getById: () => { return { id: null } }
}

const useCases = Object.keys(validUseCaseRequests)

const value4type = {
  String: 'string',
  Number: 99,
  Boolean: true,
  Array: []
}

function generateRequestObject (scheema, action, validReq) {
  const obj = {}
  for (const key of Object.keys(scheema)) {
    obj[key] = value4type[scheema[key].type.name]
  }
  if(validReq) return validUseCaseRequests[action](obj)
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
            camelCase: camelCase(name)
          },
          request: {
            valid: objToString(generateRequestObject(schema, action, true)),
            invalid: objToString(generateRequestObject(schema, action, false))
          }
        }
      })
    }
  }
}
