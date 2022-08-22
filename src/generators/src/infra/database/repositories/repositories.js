const { requireHerbarium } = require('../../../../utils')
const camelCase = require('lodash.camelcase')
const fs = require('fs')
const path = require('path')

async function generateRepositories(generate, filesystem, db, command) {
  const requires = {}

  const herbarium = requireHerbarium(command, filesystem.cwd())
  const entities = herbarium.entities.all

  for (const entity of Array.from(entities.values())) {
    const { name } = entity.entity.prototype.meta
    const lowCCName = camelCase(name)
    const repositoryPath = path.normalize(`${filesystem.cwd()}/src/infra/data/repositories/${lowCCName}Repository.js`)

    requires[`${lowCCName}Repository`] = `await new (require('./${lowCCName}Repository.js'))(conn)`

    if (fs.existsSync(repositoryPath)) continue

    await generate({
      template: `infra/data/repository/${db}/repository.ejs`,
      target: repositoryPath,
      props: {
        name: {
          pascalCase: name,
          camelCase: lowCCName
        },
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
    sqlite: '/src/infra/config/sqlite.js',
    mysql: '/src/infra/config/mysql.js',
  }

  const db = Object.keys(paths).filter(key => fs.existsSync(`${filesystem.cwd()}${paths[key]}`))

  return generateRepositories(generate, filesystem, db, command)
}

module.exports = async ({ template: { generate }, parameters: { options }, filesystem }, command) => async () => {

  process.stdout.write(`Generating Repositories\n`)

  let requires = {}

  if (command) requires = await updateRepositories(generate, filesystem, command)

  for (const db of ['postgres', 'sqlserver', 'mongo', 'mysql','sqlite']) {
    if (!options[db]) continue

    requires = Object.assign(requires, await generateRepositories(generate, filesystem, db, command))
  }
}
