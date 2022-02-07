const fs = require('fs')
const ignore = () => {}

module.exports = async (tools) => {
  const options = tools.parameters.options
  const infra = options.graphql || options.rest
  const updateMigration = fs.existsSync(`${tools.filesystem.cwd()}/src/infra/data/database/migrations`)

  return {
    new: {
      packageJson: await require('./src/packagejson')(tools),
      config: infra ? await require('./src/infra/config')(tools) : ignore,
      entities: await require('./src/domain/entities')(tools),
      connection: await require('./src/infra/database/connection')(tools),
      repositories: await require('./src/infra/database/repositories/repositories')(tools),
      migrations: (options.postgres || options.sqlserver || options.mysql) ? await require('./src/infra/database/migrations/migrations')(tools) : ignore,
      useCases: await require('./src/domain/usecases/useCases')(tools),
      useCasesTests: await require('./src/domain/usecases/unitTests')(tools),
      graphql: options.graphql ? await require('./src/infra/api/graphql')(tools) : ignore,
      rest: options.rest ? await require('./src/infra/api/rest')(tools) : ignore,
      server: infra ? await require('./src/infra/api/server')(tools) : ignore,
      index: await require('./src/index')(tools),
      git: options.git ? await require('./src/infra/git')(tools) : ignore
    },
    update: {
      entities: await require('./src/domain/entities')(tools, true),
      useCases: await require('./src/domain/usecases/useCases')(tools),
      useCasesTests: await require('./src/domain/usecases/unitTests')(tools),
      migrations: updateMigration ? await require('./src/infra/database/migrations/migrations')(tools) : ignore,
      repositories: await require('./src/infra/database/repositories/repositories')(tools, true)
    }
  }
}
