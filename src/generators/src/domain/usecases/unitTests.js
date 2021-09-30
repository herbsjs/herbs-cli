
const camelCase = require('lodash.camelcase')
const { objToString } = require('../../../utils')
const fs = require('fs')

const useCaseRequests = {
  create: (obj) => {
    delete obj.id 
    return obj
  },
  update: (obj) => obj,
  delete: (obj) => { return { id: obj.id } },
  getById: (obj) => { return { id: obj.id} }
}

const useCases = Object.keys(useCaseRequests)

const value4type = {
  String: 'string',
  Number: 99,
  Boolean: true,
  Array: []
}

function generateRequestObject(scheema, action, valid){
  const obj = {}
  for(const key of Object.keys(scheema)){
      obj[key] = value4type[scheema[key].type.name] 
  }
  return useCaseRequests[action](obj)
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
