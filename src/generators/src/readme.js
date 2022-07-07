module.exports = 
  async ({
    template: { generate },
    parameters: {
      options
  } }) => async () => {

  process.stdout.write(`Generating Readme\n`)

  const migrationObj = { 
    'postgres': 'Postgres', 
    'sqlserver': 'SQL Server', 
    'mysql': 'MySQL', 
    'mongo': 'Mongo Db'
  }
  const migration = migrationObj[options.database]

  await generate({
    template: 'readme.ejs',
    target: 'readme.md',
    props: {
      ...options,
      migration
    }
  })
}
