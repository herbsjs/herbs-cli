const { objToString } = require('../../utils')
const { filesystem } = require('gluegun')
const path = require('path')
const fs = require('fs')

function generateEntities (entitiesPath, level = './') {
  let requires = {}
  fs.readdirSync(entitiesPath).forEach(element => {
    const elementPath = path.join(entitiesPath, element)
    const splittedFileName = element.split('.')

    const isFile = fs.lstatSync(elementPath).isFile()
    if(!isFile){
      const result = generateEntities(elementPath, `${level}${element}/`)
      requires = Object.assign(requires, result)
      return
    }

    // Can I require it?
    if (isFile
      && splittedFileName.pop() === 'js'
      && splittedFileName[0] !== 'index') {
      const entity = require(`${entitiesPath}/${element}`)
      requires[entity.name] = `require('${level}${element}')`
    }
  })
  return requires
}

module.exports = async ({ template: { generate }}) => async () => {
  const requires = generateEntities(`${filesystem.cwd()}/src/domain/entities`)

  await generate({
    template: 'domain/entities/index.ejs',
    target: 'src/domain/entities/index.js',
    props: { requires: objToString(requires) }
  })
}
