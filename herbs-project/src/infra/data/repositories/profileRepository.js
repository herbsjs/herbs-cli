const { Repository } = require("herbs2knex")
const { Profile } = require('../../../domain/entities')

module.exports = class ProfileRepository extends Repository {
    constructor(connection) {
        super({
            entity: Profile,
            table: "profiles",
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
