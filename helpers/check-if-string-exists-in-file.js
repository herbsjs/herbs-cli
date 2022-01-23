const checkIfStringExistsInFile = (file, pattern) => {
  const result = !!file
    .split('\n')
    .find(line => {
      return line.includes(`${pattern}`)
    })

  return result
}

module.exports = checkIfStringExistsInFile
