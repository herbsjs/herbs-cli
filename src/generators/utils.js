const camelCase = require('lodash.camelcase')
const startCase = require('lodash.startCase')

module.exports = {
  objToString: (obj, spaces = 4) => JSON.stringify(obj, null, spaces).replace(/"/g, ''),
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
