module.exports = async ({ template: { generate }, parameters: { options } }) => async () => {
  
  process.stdout.write(`Generating Connections\n`)
  
  const databases = ['postgres', 'mongo', 'sqlserver', 'mysql']
  for (const db of databases) {
    if (!options[db]) continue
    await generate({
      template: `infra/data/database/${db}/database.ejs`,
      target: 'src/infra/data/database/index.js'
    })
  }
}
