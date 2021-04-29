module.exports = { 
    toLowCamelCase: (str) => `${str[0].toLowerCase()}${str.slice(1)}`,
    objToString: (obj) =>  JSON.stringify(obj, null, 4).replaceAll('"', ''),
    arrayToString: (arr) =>  JSON.stringify(arr, null, 1).replaceAll('"', '').replaceAll('\\n', '')
 }