const { expect } = require('chai')
const cliCommand = require('../helpers/cli-command')


describe('Console outputs', () => {
  it('should return version in console', async () => {
    // Given
    const versionCommandOutput = await cliCommand('--version')

    // Then
    expect(versionCommandOutput).not.equal(null)
  })

  it('should return help text in console', async () => {
    // Given
    const helpCommandOutput = await cliCommand('--help')

    // Then
    expect(helpCommandOutput).not.equal(null)
  })
})
