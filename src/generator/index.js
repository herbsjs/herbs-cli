const ignore = () => {}
module.exports = async ({ 
    template: { generate },
    packageManager,
    filesystem,
    parameters: { options } }) => {
        console.log(options)

        return {
            packageJson: await require('./packagejson')({ generate, packageManager, options }),
            entities: await require('./src/domain/entities')({ generate, options }),
            errors: await require('./src/domain/errors')({ generate, options }),
            repositories: options.repository ? await require('./src/database/repositories/repositories')({ generate, options, filesystem }) : ignore,
            useCases: await require('./src/domain/useCases')({ generate, filesystem  }),
            graphql: options.graphql ? await require('./src/infra/graphql')({ generate, filesystem  }) : ignore,
            rest: await require('./src/infra/rest')({ generate  }),
            server: await require('./src/infra/server')({ generate  }),
            index: await require('./src/index')({ generate  })
        }
}
