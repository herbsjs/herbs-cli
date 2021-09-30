const { objToString } = require('../../../../utils')
const camelCase = require('lodash.camelcase')
const fs = require('fs')
async function generateRepositories (generate, filesystem, db) {
  const requires = {}
  const entities = require(`${filesystem.cwd()}/src/domain/entities`)

  for (const entity of Object.keys(entities)) {
    const { name } = entities[entity].prototype.meta
    const lowCCName = camelCase(name)
    const repositoryPath = `${filesystem.cwd()}/src/infra/data/repositories/${lowCCName}Repository.js`

    requires[`${lowCCName}Repository`] = `await new (require('./${lowCCName}Repository.js'))(conn)`

    if (fs.existsSync(repositoryPath)) continue

    await generate({
      template: `data/repository/${db}/repository.ejs`,
      target: repositoryPath,
      props: {
        name: {
          pascalCase: name,
          camelCase: lowCCName
        },
        table: `${lowCCName}s`
      }
    })
  }
  return requires
}

async function updateRepositories (generate, filesystem) {
  const mongoPath = '/src/infra/data/repositories/baseRepository.js'
  const msSqlPath = '/src/infra/config/sqlserver.js'
  const pgPath = '/src/infra/config/postgres.js'
  let db 

  if (fs.existsSync(`${filesystem.cwd()}${mongoPath}`)) db = 'mongo'
  if (fs.existsSync(`${filesystem.cwd()}${msSqlPath}`)) db = 'sqlserver'
  if (fs.existsSync(`${filesystem.cwd()}${pgPath}`)) db = 'postgres'

  return generateRepositories(generate, filesystem, db)
}

module.exports = async ({ template: { generate }, parameters: { options }, filesystem }, isUpdate) => async () => {
  let requires = {}
  
  if (isUpdate) requires = await updateRepositories(generate, filesystem)

  for (const db of ['postgres', 'sqlserver', 'mongo']) {
    if (!options[db]) continue
    
    if (db === 'mongo') {
      await generate({
        template: 'data/repository/mongo/baseRepository.ejs',
        target: 'src/infra/data/repositories/baseRepository.js'
      })
    }
    requires = Object.assign(requires, await generateRepositories(generate, filesystem, db))
    await generate({
      template: 'data/repository/index.ejs',
      target: 'src/infra/data/repositories/index.js',
      props: { requires: objToString(requires) }
    })
  }
}
