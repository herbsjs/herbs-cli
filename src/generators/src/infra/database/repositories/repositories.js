const { requireHerbarium } = require('../../../../utils')
const camelCase = require('lodash.camelcase')
const fs = require('fs')
const path = require('path')

const types = {String , Boolean, Number, undefined, Symbol, Object, Null: null}

function generateForeignKeysField(schema) {
  const idFieldsNames = {}
  Object.values(schema).map(field => {
    if (types[field.type.name]) return

    const { schema, name } = field.type.prototype.meta

    Object.values(schema).map(idFields => {
      if(idFields.options.isId)
        idFieldsNames[`${camelCase(name)}_${idFields.name}`] = idFields.type.name
    })
  })
  return idFieldsNames
}

async function generateRepositories(generate, filesystem, db, command) {
  const requires = {}
  const herbarium = requireHerbarium(command, filesystem.cwd())
  const entities = herbarium.entities.all

  for (const entity of Array.from(entities.values())) {
    const { name, schema } = entity.entity.prototype.meta
    const lowCCName = camelCase(name)
    const repositoryPath = path.normalize(`${filesystem.cwd()}/src/infra/data/repositories/${lowCCName}Repository.js`)
    let foreignKeysFields
    const primaryKeyFields = []
    Object.values(schema).filter(idFields => {
      if(idFields.options.isId)
        primaryKeyFields.push(idFields.name)
    })

    requires[`${lowCCName}Repository`] = `await new (require('./${lowCCName}Repository.js'))(conn)`

    if (fs.existsSync(repositoryPath)) continue

    if (db !== 'mongo') foreignKeysFields = generateForeignKeysField(schema) 

    await generate({
      template: `infra/data/repository/${db}/repository.ejs`,
      target: repositoryPath,
      props: {
        name: {
          pascalCase: name,
          camelCase: lowCCName,
        },
        primaryKeyFields,
        foreignKeysFields,
        table: `${lowCCName}s`
      }
    })
    process.stdout.write(`  New: ${repositoryPath}\n`)

  }
  return requires
}

async function updateRepositories(generate, filesystem, command) {
  const paths = {
    mongo: '/src/infra/config/mongo.js',
    sqlserver: '/src/infra/config/sqlserver.js',
    postgres: '/src/infra/config/postgres.js',
    mysql: '/src/infra/config/mysql.js',
  }

  const db = Object.keys(paths).filter(key => fs.existsSync(`${filesystem.cwd()}${paths[key]}`))

  return generateRepositories(generate, filesystem, db, command)
}

module.exports = async ({ template: { generate }, parameters: { options }, filesystem }, command) => async () => {

  process.stdout.write(`Generating Repositories\n`)

  let requires = {}

  if (command) requires = await updateRepositories(generate, filesystem, command)

  for (const db of ['postgres', 'sqlserver', 'mongo', 'mysql']) {
    if (!options[db]) continue

    requires = Object.assign(requires, await generateRepositories(generate, filesystem, db, command))
  }
}
