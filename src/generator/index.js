const ignore = () => {}
module.exports = async ({ 
    template: { generate },
    packageManager,
    filesystem,
    parameters: { options } }) => {
        console.log(options)

        return {
            packageJson: await require('./packagejson')({ generate, packageManager }),
            entities: await require('./domain/entities')({ generate, options }),
            errors: await require('./domain/errors')({ generate, options }),
            useCases: await require('./domain/useCases')({ generate, filesystem  }),
            graphql: options.graphql ? await require('./infra/graphql')({ generate, filesystem  }) : ignore
        }
}
