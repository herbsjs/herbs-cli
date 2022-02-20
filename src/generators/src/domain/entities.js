const { objToString, pascalCase } = require('../../utils')
const { filesystem } = require('gluegun')
const path = require('path')
const fs = require('fs')

function updateEntities(entitiesPath, level = './') {
  let requires = {}
  fs.readdirSync(entitiesPath).forEach(element => {
    const elementPath = path.join(entitiesPath, element)
    const splittedFileName = element.split('.')

    const isFile = fs.lstatSync(elementPath).isFile()
    if (!isFile) {
      const result = updateEntities(elementPath, `${level}${element}/`)
      requires = Object.assign(requires, result)
      return
    }

    // Can I require it?
    if (isFile &&
      splittedFileName.pop() === 'js' &&
      splittedFileName[0] !== 'index') {
      const entity = require(`${entitiesPath}/${element}`)
      requires[pascalCase(entity.name)] = `require('${level}${element}')`
    }
  })
  return requires
}

module.exports = async ({ template: { generate } }, command) => async () => {

  process.stdout.write(`Generating Entities\n`)

  let requires = {}

  if (command === "update")
    requires = updateEntities(`${filesystem.cwd()}/src/domain/entities`)
  else {
    await generate({
      template: 'domain/herbarium.ejs',
      target: 'src/domain/herbarium.js'
    })
    await generate({
      template: 'domain/entities/user.ejs',
      target: 'src/domain/entities/user.js'
    })
    requires.User = 'require(\'./user.js\')'
  }
}
