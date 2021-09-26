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

async function updateRepositories (generate, filesystem, db) {
  const mongoPath = '/src/infra/data/repositories/baseRepository.js'
  if (fs.existsSync(`${filesystem.cwd()}${mongoPath}`)) db = 'mongo'

  return generateRepositories(generate, filesystem, db)
}

module.exports = async ({ template: { generate }, parameters: { options }, filesystem }, isUpdate) => async () => {
  let requires = {}

  let db
  if (options.postgres) db = 'postgres'
  if (options.sqlserver) db = 'sqlserver'

  if (isUpdate) requires = await updateRepositories(generate, filesystem, db)
  if (options.mongo) {
    await generate({
      template: 'data/repository/mongo/baseRepository.ejs',
      target: 'src/infra/data/repositories/baseRepository.js'
    })

    requires = Object.assign(requires, await generateRepositories(generate, filesystem, 'mongo'))
  }

  if (options.postgres) {
    requires = Object.assign(requires, await generateRepositories(generate, filesystem, 'postgres'))
  }
  if (options.sqlserver) {
    requires = Object.assign(requires, await generateRepositories(generate, filesystem, 'sqlserver'))
  }

  await generate({
    template: 'data/repository/index.ejs',
    target: 'src/infra/data/repositories/index.js',
    props: { requires: objToString(requires) }
  })
}
