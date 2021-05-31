const { toLowCamelCase, objToString } = require('../../utils')
const { filesystem } = require('gluegun')
const { join } = require('path')


function generateEntities(from, to) {
  let requires = {}
  fs.mkdirSync(to);
  fs.readdirSync(from).forEach(element => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
      const isJS = file.split('.')[-1].includes('js')
      if (isJS) {
        const entity = require(`${to}/${file}`)
        requires[entity.name] = `require('./${file}')`
      } else {
          const result = copyFolderSync(path.join(from, element), path.join(to, element));
          requires = Object.assign(requires, result)
      }
    }
  })
  return requires
}

// const generateEntities = (dir) => {
//   const requires = {}
//   const files = filesystem.list(dir)

//   Promise.all(files.map((file) => {
//     filesystem.copy(`${dir}/${file}`, `${filesystem.cwd()}/src/domain/entities/${file}`)
//     const isJS = file.split('.')[-1].includes('js')
//     if (isJS) {
//       const entity = require(`${filesystem.cwd()}/src/domain/entities/${file}`)
//       requires[entity.name] = `require('./${file}')`
//     }
//   }))

//   return requires
// }

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
