const camelCase = require('lodash.camelcase')
const startCase = require('lodash.startcase')
const fs = require('fs')
const path = require('path')

module.exports = {
  objToString: (obj, { spaces = 4, removeBraces = false, extraSpaces = 0, removeQuotes = true } = {}) => {

    let json = JSON.stringify(obj, null, spaces)
      .replace(/\\"/g, '"')
      .replace(/""/g, '"')

    if (removeQuotes) json = json.replace(/"/g, '')

    let lines = json.split('\n')
    if (removeBraces) {
      lines.shift()
      lines.pop()
    }

    if (extraSpaces)
      lines.forEach(function (line, index) {
        this[index] = `${' '.repeat(extraSpaces)}${line}`
      }, lines)

    return lines.join('\n').trim()
  },
  arrayToStringList: (arr, spaces = 1) => {
    const list = JSON.stringify(arr, null, spaces)
      .replace(/"/g, '')
      .replace(/\[|\]/g, '')
      .split('\n')
    list.shift()
    list.pop()
    return list.join('\n')
  },
  pascalCase: (str) => startCase(camelCase(str)).replace(/ /g, ''),
  requireHerbarium: (command, appPath) => {
    const herbariumPath = `${appPath}/src/domain/herbarium.js`
    let herbarium
    if (command !== "new") {
      herbarium = require(herbariumPath)
    }
    else
      herbarium = require('@herbsjs/herbarium').herbarium
    return herbarium
  },
  usingMongo: (base) => fs.existsSync(path.normalize(`${base}/src/infra/config/mongo.js`))
}
