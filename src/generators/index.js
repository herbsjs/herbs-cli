const fs = require('fs')
const ignore = () => {}

module.exports = async (tools) => {
  const options = tools.parameters.options
  const infra = options.graphql || options.rest
  const updateMigration = fs.existsSync(`${tools.filesystem.cwd()}/src/infra/data/database/migrations`)

  return {
    new: {
      packageJson: await require('./src/packagejson')(tools),
      entities: await require('./src/domain/entities')(tools),
      connection: await require('./src/infra/database/connection')(tools),
      repositories: await require('./src/infra/database/repositories/repositories')(tools),
      migrations: (options.postgres || options.sqlserver) ? await require('./src/infra/database/migrations/migrations')(tools) : ignore,
      useCases: await require('./src/domain/useCases/useCases')(tools),
      useCasesTests: await require('./src/domain/usecases/unitTests')(tools),
      graphql: options.graphql ? await require('./src/infra/graphql')(tools) : ignore,
      rest: options.rest ? await require('./src/infra/rest')(tools) : ignore,
      config: infra ? await require('./src/infra/config')(tools) : ignore,
      server: infra ? await require('./src/infra/server')(tools) : ignore,
      index: await require('./src/index')(tools)
    },
    update: {
      entities: await require('./src/domain/entities')(tools, true),
      useCases: await require('./src/domain/usecases/useCases')(tools, true),
      migrations: updateMigration ? await require('./src/infra/database/migrations/migrations')(tools) : ignore,
      repositories: await require('./src/infra/database/repositories/repositories')(tools, true)
    }
  }
}
