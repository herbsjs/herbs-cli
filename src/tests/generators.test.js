const { expect } = require('chai')
const { arrayToStringList } = require('../generators/utils')

describe('When I use Utils methods they should work as expected', () => {
  it('Test arrayToStringList method', () => {
    const result = arrayToStringList([
      'testString',
      'testString',
      'testString',
      'testString',
    ])
    expect(result).contains(
      ' testString,\n testString,\n testString,\n testString'
    )
  })
})
