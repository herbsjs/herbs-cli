const { usecase2query, defaultResolver } = require('@herbsjs/herbs2gql')
const { herbarium } = require('@herbsjs/herbarium')

function queries() {
    const usecases = herbarium.usecases
        .findBy({ operation: [herbarium.crud.read, herbarium.crud.readAll] })
        .map(e => e.usecase)

    const queries = usecases.map(usecase => usecase2query(usecase(), defaultResolver(usecase)))

    /* Custom Queries */
    // queries.push(require('./custom/getItems'))

    return queries
}

module.exports = queries
