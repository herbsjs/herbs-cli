module.exports = async ({ 
    template: { generate },
    packageManager,
    filesystem,
    parameters: { options } }) => {
        return {
            packageJson: await require('./packagejson')({ generate, packageManager }),
            entities: await require('./entities')({ generate, options }),
            errors: await require('./errors')({ generate, options }),
            useCases: await require('./useCases')({ generate, filesystem  })
        }
}
