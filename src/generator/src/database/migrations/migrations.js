
const camelCase = require('lodash.camelcase')

function type2Str(type) {
    const _type = new type() 
    if(_type instanceof String) return 'string'
    if(_type instanceof Number) return 'integer'
    if(_type instanceof Boolean) return 'boolean'
    if(_type instanceof Date) return 'timestamps'
}
module.exports =  async ({ generate, filesystem, options }) => async () => {
    console.log(options)
    const entities = require(`${filesystem.cwd()}/src/domain/entities`)
    
    for(const entity of Object.keys(entities)){
        const columns = []
        const { name, schema } = entities[entity].prototype.meta
        Object.keys(schema).forEach(prop => {
            const { name, type }  = schema[prop]
            if(name === 'id') return
            columns.push(`table.${type2Str(type)}('${camelCase(name)}')`)
        })
        const migrationName = new Date().toISOString().replace(/\D/g,'').substring(0,14);
        await generate({
            template: `data/database/postgres/migration.ejs`,
            target: `src/infra/data/database/migrations/${migrationName}_${camelCase(name)}s.js`,
            props: { table: `${camelCase(name)}s`, columns: columns.join('\n')}
        })  
    }
    await generate({
        template: `knexFile.ejs`,
        target: `knexFile.js`,
        props: { dbName: options.name}
    })  
}
