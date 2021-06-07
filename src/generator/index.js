const ignore = () => {}
module.exports = async ({ 
    template: { generate },
    print,
    packageManager,
    filesystem,
    parameters: { options } }) => {
        return {
            packageJson: await require('./packagejson')({ generate, packageManager, options, print }),
            entities: await require('./src/domain/entities')({ generate, options }),
            errors: await require('./src/domain/errors')({ generate, options }),
            connection: await require('./src/database/connection')({ generate, options }),
            repositories: await require('./src/database/repositories/repositories')({ generate, options, filesystem }),
            migrations: options.postgres ? await require('./src/database/migrations/migrations')({ generate, filesystem }) : ignore,
            useCases: await require('./src/domain/useCases')({ generate, filesystem  }),
            graphql: options.graphql ? await require('./src/infra/graphql')({ generate  }) : ignore,
            rest: await require('./src/infra/rest')({ generate, filesystem  }),
            config: await require('./src/config')({ generate, options  }),
            server: await require('./src/infra/server')({ generate  }),
            index: await require('./src/index')({ generate  })
        }
}
