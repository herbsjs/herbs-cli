const ignore = () => {}
module.exports = async ({ 
    template: { generate },
    packageManager,
    filesystem,
    parameters: { options } }) => {
        console.log(options)

        return {
            packageJson: await require('./packagejson')({ generate, packageManager, options }),
            entities: await require('./domain/entities')({ generate, options }),
            errors: await require('./domain/errors')({ generate, options }),
            repository: options.repository ? await require('./database/repositories/repositories')({ generate, options, filesystem }) : ignore,
            useCases: await require('./domain/useCases')({ generate, filesystem  }),
            graphql: options.graphql ? await require('./infra/graphql')({ generate, filesystem  }) : ignore
        }
}
