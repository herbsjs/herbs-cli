const fs = require('fs-extra')

async function moveFolder(src, destination) {
  try {
    await fs.move(src, destination, {
      overwrite: true
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

module.exports = moveFolder
