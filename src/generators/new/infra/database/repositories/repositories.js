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

module.exports = async ({ template: { generate }, parameters: { options }, filesystem }) => async () => {
  let requires = {}
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
  await generate({
    template: 'data/repository/index.ejs',
    target: 'src/infra/data/repositories/index.js',
    props: { requires: objToString(requires) }
  })
}
