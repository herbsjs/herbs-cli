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
  const pkg = filesystem.read('herbs-project/package.json')

  expect(pkg).toContain(`"main": "src/index.js",`)
  expect(pkg).toContain(`"name": "herbs-project"`)
  expect(pkg).toContain(`"description": "testing the herbs CLI",`)
  expect(pkg).toContain(`"knex:make": "npx knex --knexfile knexfile.js migrate:make",`)
  expect(pkg).toContain(`"knex:migrate": "npx knex --knexfile knexfile.js migrate:latest",`)
  expect(pkg).toContain(`"knex:rollback": "npx knex --knexfile knexfile.js migrate:rollback",`)
  expect(pkg).toContain(`"knex:makeSeeds": "npx knex --knexfile knexfile.js seed:make",`)
  expect(pkg).toContain(`"knex:runSeeds": "npx knex --knexfile knexfile.js seed:run"`)
  expect(pkg).toContain(`"author": "herbs",`)
  expect(pkg).toContain(`"license": "MIT",`)

  // cleanup artifact
  filesystem.remove('herbs-project')
})
