const { expect } = require('chai')
const { arrayToStringList, pascalCase } = require('../generators/utils')

describe('When I use utils', () => {
  it('Test arrayToStringList', () => {
    const result = arrayToStringList(['ASDSAd', 'ASDSAd', 'ASDSAd', 'ASDSAd'])
    expect(result).contains(' ASDSAd,\n ASDSAd,\n ASDSAd,\n ASDSAd')
  })
})
