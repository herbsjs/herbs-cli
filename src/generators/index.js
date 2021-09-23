const fs = require('fs')
const ignore = () => {}

module.exports = async (tools) => {
  const options = tools.parameters.options
  const infra = options.graphql || options.rest
  const updateMigration = fs.existsSync(`${tools.filesystem.cwd()}/src/infra/data/database/migrations`)

  return {
    new: {
      packageJson: await require('./new/packagejson')(tools),
      entities: await require('./new/domain/entities')(tools),
      connection: await require('./new/infra/database/connection')(tools),
      repositories: await require('./new/infra/database/repositories/repositories')(tools),
      migrations: options.postgres ? await require('./new/infra/database/migrations/migrations')(tools) : ignore,
      useCases: await require('./new/domain/useCases')(tools),
      graphql: options.graphql ? await require('./new/infra/graphql')(tools) : ignore,
      rest: options.rest ? await require('./new/infra/rest')(tools) : ignore,
      config: infra ? await require('./new/infra/config')(tools) : ignore,
      server: infra ? await require('./new/infra/server')(tools) : ignore,
      index: await require('./new/index')(tools)
    },
    update: {
      entities: await require('./new/domain/entities')(tools, true),
      useCases: await require('./new/domain/useCases')(tools, true),
      migrations: updateMigration ? await require('./new/infra/database/migrations/migrations')(tools) : ignore,
      repositories: await require('./new/infra/database/repositories/repositories')(tools, true)
    }
  }
}
