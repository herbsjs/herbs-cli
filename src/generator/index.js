module.exports = async ({ 
    template: { generate },
    packageManager,
    filesystem }) => {
        return {
            packageJson: await require('./packagejson')({ generate, packageManager }),
            entities: await require('./entities')({ generate }),
            useCases: await require('./useCases')({ generate, filesystem  })
        }
}
