
const command = {
  name: 'herbs',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Welcome to your Herbs CLI')
  }
}

module.exports = command
