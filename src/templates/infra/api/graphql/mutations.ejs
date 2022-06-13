const { usecase2mutation, defaultResolver } = require('@herbsjs/herbs2gql')
const { herbarium } = require('@herbsjs/herbarium')

function mutations() {
    const crud = herbarium.crud
    const usecases = herbarium.usecases
        .findBy({ operation: [crud.create, crud.update, crud.delete, crud.other] })
        .map(e => e.usecase)

    const mutations = usecases.map(usecase => usecase2mutation(usecase(), defaultResolver(usecase)))

    /* Custom Mutations Example */
    // mutations.push(require('./custom/createItem'))}

    return mutations
}

module.exports = mutations