const camelCase = require('lodash.camelcase')
const startCase = require('lodash.startCase')

module.exports = {
  objToString: (obj, { spaces = 4, removeQuotes = false, extraSpaces = 0 } = {}) => {

    let json = JSON.stringify(obj, null, spaces).replace(/"/g, '')

    let lines = json.split('\n')

    if(removeQuotes) {
      lines.shift()
      lines.pop()
    }
    
    if(extraSpaces)
      lines.forEach(function(line, index) {
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
}
