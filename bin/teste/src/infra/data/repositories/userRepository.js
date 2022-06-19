const User = require('../../../domain/entities/user')
const { herbarium } = require('@herbsjs/herbarium')
const { Repository } = require('@herbsjs/herbs2mongo')
const connection = require('../database/connection')

class UserRepository extends Repository {
    constructor(injection){
        super({ 
            entity: User,
            collection: 'user',
            ids: ['id'],  
            mongodb: connection
        })
    }

    async findAll(options = { filter, project, skip, limit, sort }) {
        return await this.find(options)            
    }
}

module.exports =
    herbarium.repositories
        .add(UserRepository, 'UserRepository')
        .metadata({ entity: User })
        .repository