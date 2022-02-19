const fs = require('fs')
const ignore = () => { }

module.exports = async (tools) => {
  const options = tools.parameters.options
  const infra = options.graphql || options.rest
  const updateMigration = fs.existsSync(`${tools.filesystem.cwd()}/src/infra/data/database/migrations`)
  const cmd = { new: "new", update: "update" }

  return {
    new: {
      packageJson: await require('./src/packagejson')(tools, cmd.new),
      config: infra ? await require('./src/infra/config')(tools, cmd.new) : ignore,
      entities: await require('./src/domain/entities')(tools, cmd.new),
      connection: await require('./src/infra/database/connection')(tools, cmd.new),
      graphql: options.graphql ? await require('./src/infra/api/graphql')(tools, cmd.new) : ignore,
      rest: options.rest ? await require('./src/infra/api/rest')(tools, cmd.new) : ignore,
      server: infra ? await require('./src/infra/api/server')(tools, cmd.new) : ignore,
      index: await require('./src/index')(tools, cmd.new),
      git: options.git ? await require('./src/infra/git')(tools, cmd.new) : ignore
    },
    update: {
      entities: await require('./src/domain/entities')(tools, cmd.update),
      repositories: await require('./src/infra/database/repositories/repositories')(tools, cmd.update),
      useCases: await require('./src/domain/usecases/useCases')(tools, cmd.update),
      useCasesTests: await require('./src/domain/usecases/unitTests')(tools, cmd.update),
      migrations: await require('./src/infra/database/migrations/migrations')(tools, cmd.update),
    }
  }
}
