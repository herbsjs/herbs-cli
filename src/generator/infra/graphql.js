const { toLowCamelCase, requiresToString } = require('../utils')

module.exports =  async ({ generate, filesystem }) => async () => {
    const useCases = require(`${filesystem.cwd()}/src/domain/usecases`)
    const requires = []
    
    for(const entity of Object.keys(useCases))
        for(const action of Object.keys(useCases[entity]))
            requires.push(`
            require('../../../domain/usecase/${toLowCamelCase(action)}')`)
    
    const usecases = JSON.stringify(requires, null, 1)
                         .replaceAll('"', '' )
                         .replaceAll('\\n', '' )
    await generate({
        template: 'infra/api/graphql/mutations.ejs',
        target: `src/infra/api/mutations.js`,
        props: { usecases }
    })
}


