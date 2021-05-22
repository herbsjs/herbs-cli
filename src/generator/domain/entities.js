const { objToString } = require('../utils')
const { filesystem } = require('gluegun')
const { join } = require('path')

const generateEntities = (dir) => {
  const requires = {}
  const files = filesystem.list(dir)

  Promise.all(files.map((file) => {
    filesystem.copy(`${dir}/${file}`, `${filesystem.cwd()}/src/domain/entities/${file}`, { matching: '*.js' })
    const isJS = filesystem.inspect(`${filesystem.cwd()}/src/domain/entities/${file}`)
    if (isJS) {
      const entity = require(`${filesystem.cwd()}/src/domain/entities/${file}`)
      requires[entity.name] = `require('./${file}')`
    }
  }))

  return requires
}

module.exports = async ({ generate, options }) => async () => {
  let requires = {}
  if (options.entities && options.entities !== true) {
    requires = await generateEntities(options.entities)
  } else {
    requires = await generateEntities(join(__dirname, '../../templates/domain/entities'))
  }

  await generate({
    template: 'domain/entities/index.ejs',
    target: 'src/domain/entities/index.js',
    props: { requires: objToString(requires) }
  })
}
