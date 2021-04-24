module.exports = { 
    toLowCamelCase: (str) => `${str[0].toLowerCase()}${str.slice(1)}`,
    requiresToString: (requires) =>  JSON.stringify(requires, null, 4).replaceAll('"', '')
 }