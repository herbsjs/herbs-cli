const command = {
  name: 'herbs',
  run: async toolbox => {
    toolbox.print.info("Welcome to Herbs CLI 🌿")
    toolbox.print.info("Type 'herbs help' for more information")
  }

}

module.exports = command
