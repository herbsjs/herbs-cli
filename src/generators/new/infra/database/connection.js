module.exports = async ({ template: { generate }, parameters: { options } }) => async () => {
  const databases = ['postgres', 'mongo', 'sqlserver']
  for (const db of databases) {
    if (!options[db]) continue
    await generate({
      template: `data/database/${db}/database.ejs`,
      target: 'src/infra/data/database/index.js'
    })
  }
}
