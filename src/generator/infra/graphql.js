const { arrayToStringList } = require('../utils')

module.exports =  async ({ generate, filesystem }) => async () => {
    const queries = []
    const mutations = []
    const useCases = require(`${filesystem.cwd()}/src/domain/usecases`)
    for(const usecase of Object.keys(useCases)){
        if([`create`, 'update', 'delete'].some(action => usecase.includes(action)))
            mutations.push(`usecases.${usecase}(repositories)`)
        else
            queries.push(`usecases.${usecase}(repositories)`)
    }

    await generate({
        template: 'infra/api/graphql/mutations.ejs',
        target: `src/infra/api/mutations.js`,
    })

    await generate({
        template: 'infra/api/graphql/queries.ejs',
        target: `src/infra/api/queries.js`,
    })

    await generate({
        template: 'infra/api/graphql/types.ejs',
        target: `src/infra/api/types.js`
    })
    
    await generate({
        template: 'infra/api/graphql/index.ejs',
        target: `src/infra/api/index.js`,
        props: { queries: arrayToStringList(queries, 6), mutations: arrayToStringList(mutations, 6) }
    })
}


