const { Repository } = require("@herbsjs/herbs2knex")
const { herbarium } = require('@herbsjs/herbarium')
const User = require('../../../domain/entities/user')
const connection = require('../database/connection')

class UserRepository extends Repository {
    constructor(injection) {
        super({
            entity: User,
            table: "users",
            knex: connection
        })
    }
}

module.exports =
    herbarium.repositories
        .add(UserRepository, 'UserRepository')
        .metadata({ entity: User })
        .repository