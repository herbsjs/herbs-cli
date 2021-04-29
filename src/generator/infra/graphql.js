const { toLowCamelCase, arrayToString } = require('../utils')

const props = {
    mutations: (useCases) => {
        const requires = []

        for(const entity of Object.keys(useCases))
            for(const action of Object.keys(useCases[entity])){ 
                const lowAction = toLowCamelCase(action)
                // const lowEntity = toLowCamelCase(action)
                requires.push(`
                require('../../../domain/usecase/${lowAction}').${lowAction}()`)
            }

        return arrayToString(requires)
    }
}
module.exports =  async ({ generate, filesystem }) => async () => {
    const useCases = require(`${filesystem.cwd()}/src/domain/usecases`)

    await generate({
        template: 'infra/api/graphql/mutations.ejs',
        target: `src/infra/api/mutations.js`,
    })

    await generate({
        template: 'infra/api/graphql/types.ejs',
        target: `src/infra/api/types.js`
    })

    await generate({
        template: 'infra/api/graphql/index.ejs',
        target: `src/infra/api/index.js`
    })
}


