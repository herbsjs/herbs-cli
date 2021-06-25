
exports.up = async function (knex) {
    return knex.schema
    .createTableIfNotExists('rooms', function (table) {
        table.increments('id').primary()
        table.string('nickname')
table.string('password')
    })
}

exports.down = function (knex) {
    return knex.schema 
    .dropTableIfExists('rooms')
}