const { snakeCase, camelCase } = require('lodash')
const fs = require("fs")
const glob = require('glob')
const path = require('path')
const { requireHerbarium } = require('../../../../utils')

module.exports =
  async ({ template: { generate }, filesystem }, command) =>
    async () => {
      if (fs.existsSync(`${filesystem.cwd()}/src/infra/config/mongo.js`)) return

      process.stdout.write(`Generating Migration\n`)

      const herbarium = requireHerbarium(command, filesystem.cwd())
      const entities = herbarium.entities.all

      const cwd = filesystem.cwd().replace(new RegExp('\\\\', 'g'), '/')
      const migrationsPath = `${cwd}/src/infra/data/database/migrations`

      for (const entity of Array.from(entities.values())) {
        const { name, schema } = entity.entity.prototype.meta

        if (glob.sync(`${migrationsPath}/*_${camelCase(name)}s.js`).length) {
          // don't override already existing migration files for that entity 
          continue
        }

        function type2Str(Type) {
          const nativeTypes = [Boolean, Number, String, Array, Object, Date, Function]

          if (nativeTypes.includes(Type)) {
            const _type = new Type()
            if (_type instanceof String) return 'string'
            if (_type instanceof Number) return 'integer'
            if (_type instanceof Boolean) return 'boolean'
            if (_type instanceof Date) return 'timestamp'
          }
        }

        function getDBType(appDir) {
          const configDir = path.join(appDir, `/src/infra/config`)
          const config = require(configDir)
          return config.database.herbsCLI
        }

        function createColumns(schema) {
          const columns = []
          Object.keys(schema).forEach((prop) => {
            const { name, type, options } = schema[prop]
            if (typeof schema[prop] === 'function') return
            columns.push(`table.${type2Str(type)}('${snakeCase(name)}')${options.isId ? '.primary()' : ''}`)
          })
          return columns
        }

        const db = getDBType(filesystem.cwd())
        const migrationName = new Date()
          .toISOString()
          .replace(/\D/g, '')
          .substring(0, 14)
        const migrationFullPath = path.normalize(`${migrationsPath}/${migrationName}_${camelCase(name)}s.js`)

        const columns = createColumns(schema)

        await generate({
          template: `infra/data/database/${db.toLowerCase()}/migration.ejs`,
          target: migrationFullPath,
          props: { table: `${camelCase(name)}s`, columns: columns }
        })
        process.stdout.write(`  New: ${migrationFullPath}\n`)

      }
    }
