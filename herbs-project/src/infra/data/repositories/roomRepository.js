const { Repository } = require("herbs2knex")
const { Room } = require('../../../domain/entities')

module.exports = class RoomRepository extends Repository {
    constructor(connection) {
        super({
            entity: Room,
            table: "rooms",
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
