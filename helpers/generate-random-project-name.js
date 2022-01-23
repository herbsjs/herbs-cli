const generateRandomProjectName = () => {
  const name = `${Math.random().toString(36).substring(7)}-project`
  return name.toLowerCase()
}

module.exports = generateRandomProjectName