const { Repository } = require("herbs2knex")
const { User } = require('../../../domain/entities')

module.exports = class UserRepository extends Repository {
    constructor(connection) {
        super({
            entity: User,
            table: "users",
            ids: ["id"],
            knex: connection
        })
    }

    async deleteByID(id) {
        const ret = await this.runner
          .where('id', id)
          .delete()
    
        return ret === 1
    }
}
