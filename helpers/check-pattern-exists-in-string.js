const checkPatternExistsInString = (string, pattern) => {
  const result = !!string
    .split('\n')
    .find(line => {
      return line.includes(`${pattern}`)
    })

  return result
}

module.exports = checkPatternExistsInString
