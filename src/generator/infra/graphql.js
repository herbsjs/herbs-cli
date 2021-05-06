const { arrayToStringList } = require('../utils')

module.exports =  async ({ generate, filesystem }) => async () => {
    const useCases = require(`${filesystem.cwd()}/src/domain/usecases`)
    const queries = []
    const mutations = []
    for(const entity of Object.keys(useCases)){
        for(const action of Object.keys(useCases[entity])){
            if(['create', 'update', 'delete'].includes(action))
                mutations.push(`require('../../domain/usecases').${entity}.${action}`)
            else
                queries.push(`require('../../domain/usecases').${entity}.${action}`)
        }
    }

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
        target: `src/infra/api/index.js`,
        props: { queries: arrayToStringList(queries, 8), mutations: arrayToStringList(mutations, 8) }
    })
}


