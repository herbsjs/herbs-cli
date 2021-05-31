const { objToString } = require('../../utils')
const startCase = require('lodash.startcase');
const { filesystem } = require('gluegun')
const path = require('path')
const fs = require('fs')


function generateEntities(from, to, level = './') {
  let requires = {}
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
      const splittedElement = element.split('.')
      const ext = splittedElement.pop()
      const entityName = startCase(splittedElement.shift())
      if (ext === 'js') {
        const entity = require(`${to}/${element}`)[entityName]
        requires[entity.name] = `require('${level}${element}').${entityName}`
      }
    }
    else{
      const result = generateEntities(path.join(from, element), path.join(to, element), `${level}${element}/`);
      requires = Object.assign(requires, result)
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
    console.log(options.entities)
    requires = await generateEntities(options.entities, `${filesystem.cwd()}/src/domain/entities`)
  } else {
    requires = await generateEntities(join(__dirname, '../../templates/domain/entities'))
  }

  await generate({
    template: 'domain/entities/index.ejs',
    target: 'src/domain/entities/index.js',
    props: { requires: objToString(requires) }
  })
}
