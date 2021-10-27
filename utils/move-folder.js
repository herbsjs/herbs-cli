const fs = require('fs-extra');

async function moveFolder(src, destination) {
  try {
    await fs.move(src, destination, {
      overwrite: true
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = moveFolder
