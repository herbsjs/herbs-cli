const { entity, id, field } = require('@herbsjs/herbs')
const { herbarium } = require('@herbsjs/herbarium')

const User =
        entity('User', {
          id: id(String),
          nickname: field(String),
          password: field(String)
        })

module.exports =
  herbarium.entities
    .add(User, 'User')
    .entity
