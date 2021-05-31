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
        // todo: must to be dynamic
        requires[`${entity.name}Input`] = `require('${level}${element}').${entityName}Input`
      }
    }
    else{
      const result = generateEntities(path.join(from, element), path.join(to, element), `${level}${element}/`);
      requires = Object.assign(requires, result)
    }
  })
  return requires
}

module.exports = async ({ generate, options }) => async () => {
  let requires = {}
  if (options.entities && options.entities !== true) {
    requires = await generateEntities(options.entities, `${filesystem.cwd()}/src/domain/entities`)
  } else {
    await generate({
      template: 'domain/entities/user.ejs',
      target: 'src/domain/entities/user.js',
    })
    requires['user'] = `require('./user.js').User`
    requires['userInput'] = `require('./user.js').UserInput`
  }

  await generate({
    template: 'domain/entities/index.ejs',
    target: 'src/domain/entities/index.js',
    props: { requires: objToString(requires) }
  })
}
