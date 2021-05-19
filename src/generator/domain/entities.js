const { toLowCamelCase, objToString } = require('../utils')
const { filesystem } = require('gluegun')
// const regex = /(entity\(.[a-z].+(\s.+){0,}\}\))/gim

const entities = [
  {
    name: 'User',
    fields: `nickname: field(String),
            password: field(String)`
  }
]
module.exports = async ({ generate, options }) => async () => {
  const requires = {}
  if (options.entities && options.entities !== true) {
    const files = await filesystem.list(options.entities)
    files.forEach((file) => {
      filesystem.copy(`${options.entities}\\\\${file}`, `${filesystem.cwd()}/src/domain/entities/${file}`)
      const entity = require(`${filesystem.cwd()}/src/domain/entities/${file}`)
      requires[entity.name] = `require('./${file}')`
    })
  } else {
    await Promise.all(entities.map(async entity => {
      const nameInCC = toLowCamelCase(entity.name)

      await generate({
        template: `domain/entities/${nameInCC}.ejs`,
        target: `src/domain/entities/${nameInCC}.js`,
        props: entity
      })
      requires[entity.name] = `require('./${nameInCC}.js')`
    }))
  }

  await generate({
    template: 'domain/entities/index.ejs',
    target: 'src/domain/entities/index.js',
    props: { requires: objToString(requires) }
  })
}
