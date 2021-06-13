const { system, filesystem } = require('gluegun')

const src = filesystem.path(__dirname, '..')

const cli = async cmd =>
  system.run('node ' + filesystem.path(src, 'bin', 'herbs') + ` ${cmd}`)

test('outputs version', async () => {
  const output = await cli('--version')
  expect(output).toContain('0.0.1')
})

test('outputs help', async () => {
  const output = await cli('--help')
  expect(output).toContain('0.0.1')
})

test('generates package.json', async () => {
  await cli('new --name herbs-project --description "testing the herbs CLI" --author herbs --licence MIT --graphql --postgres --yarn')

  // expect(output).toContain('Generated file at models/foo-model.js')
  const package = filesystem.read('package.json')

  expect(package).toContain(`"main": "src/index.js",`)
  expect(package).toContain(`"name": "<%= props.name %>"`)
  expect(package).toContain(`"description": "<%= props.description %>",`)
  expect(package).toContain(`"knex:make": "npx knex --knexfile knexfile.js migrate:make",
  "knex:migrate": "npx knex --knexfile knexfile.js migrate:latest",
  "knex:rollback": "npx knex --knexfile knexfile.js migrate:rollback",
  "knex:makeSeeds": "npx knex --knexfile knexfile.js seed:make",
  "knex:runSeeds": "npx knex --knexfile knexfile.js seed:run"`)
  expect(package).toContain(`"author": "italojs",`)
  expect(package).toContain(`"license": "MIT",`)
  expect(package).toContain(`"pg": "^`)

  // cleanup artifact
  filesystem.remove('src')
})
