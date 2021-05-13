module.exports = { 
    toLowCamelCase: (str) => `${str[0].toLowerCase()}${str.slice(1)}`,
    objToString: (obj, spaces = 4) =>  JSON.stringify(obj, null, spaces).replace(/"/g, ''),
    arrayToStringList: (arr, spaces = 1) =>  {
        const list = JSON.stringify(arr, null, spaces)
            .replaceAll('"', '')
            .replaceAll('[', '')
            .replaceAll(']', '')
            .split('\n')
        list.shift()
        list.pop()
        return list.join('\n')
    }
 }