const camelCase = require('lodash.camelcase')
const glob = require('glob')
const { herbarium } = require('@herbsjs/herbarium')

function type2Str(Type) {
  const _type = new Type()
  if (_type instanceof String) return 'string'
  if (_type instanceof Number) return 'integer'
  if (_type instanceof Boolean) return 'boolean'
  if (_type instanceof Date) return 'timestamps'
}

module.exports =
  async ({ template: { generate }, filesystem, parameters: { options } }) =>
    async () => {

      process.stdout.write(`Generating Migration\n`)

      herbarium.requireAll()
      const entities = herbarium.entities.all

      const migrationsPath = `${filesystem.cwd()}/src/infra/data/database/migrations`

      for (const entity of Array.from(entities.values())) {
        const { name, schema } = entity.entity.prototype.meta
        if (glob.sync(`${migrationsPath}/*_${camelCase(name)}s.js`).length) {
          continue
        }

        const columns = []
        Object.keys(schema).forEach((prop) => {
          const { name, type } = schema[prop]
          if (name === 'id') return
          columns.push(`table.${type2Str(type)}('${camelCase(name)}')`)
        })

        for (const db of ['postgres', 'sqlserver', 'mysql']) {
          if (!options[db]) continue

          const migrationName = new Date()
            .toISOString()
            .replace(/\D/g, '')
            .substring(0, 14)

          await generate({
            template: `infra/data/database/${db.toLowerCase()}/migration.ejs`,
            target: `${migrationsPath}/${migrationName}_${camelCase(name)}s.js`,
            props: { table: `${camelCase(name)}s`, columns: columns.join('\n') }
          })

          if (!glob.sync(migrationsPath).length) return

          await generate({
            template: `${db.toLowerCase()}.knexFile.ejs`,
            target: 'knexFile.js',
            props: { dbName: options.name }
          })
        }
      }
    }
