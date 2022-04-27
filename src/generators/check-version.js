const updateNotifier = require('update-notifier')
const pkg = require('../../package.json')

module.exports = async () => {
    const notifier = updateNotifier({ pkg, updateCheckInterval: 1000 })
        if (notifier.update && notifier.update.latest !== pkg.version) {
            notifier.notify({ defer: false, isGlobal: true })
        }
}