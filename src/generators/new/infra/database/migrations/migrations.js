
const camelCase = require('lodash.camelcase')
const glob = require('glob')

function type2Str (Type) {
  const _type = new Type()
  if (_type instanceof String) return 'string'
  if (_type instanceof Number) return 'integer'
  if (_type instanceof Boolean) return 'boolean'
  if (_type instanceof Date) return 'timestamps'
}

module.exports = async ({ template: { generate }, filesystem, parameters: { options } }) => async () => {
  const entities = require(`${filesystem.cwd()}/src/domain/entities`)
  const migrationsPath = `${filesystem.cwd()}/src/infra/data/database/migrations`

  for (const entity of Object.keys(entities)) {
    const { name, schema } = entities[entity].prototype.meta
    if (glob.sync(`${migrationsPath}/*_${camelCase(name)}s.js`).length) continue

    const columns = []
    Object.keys(schema).forEach(prop => {
      const { name, type } = schema[prop]
      if (name === 'id') return
      columns.push(`table.${type2Str(type)}('${camelCase(name)}')`)
    })
    for (const db of ['postgres', 'sqlserver']) {
      if (!options[db]) continue
      const migrationName = new Date().toISOString().replace(/\D/g, '').substring(0, 14)
      await generate({
        template: `data/database/${db.toLowerCase()}/migration.ejs`,
        target: `${migrationsPath}/${migrationName}_${camelCase(name)}s.js`,
        props: { table: `${camelCase(name)}s`, columns: columns.join('\n') }
      })

      if (!glob.sync(migrationsPath).length) return

      await generate({
        template: `knexFileTo${camelCase(db)}.ejs`,
        target: 'knexFile.js',
        props: { dbName: options.name }
      })
    }
  }
}
