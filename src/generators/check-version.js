const updateNotifier = require('update-notifier')
const pkg = require('../../package.json')
const ONE_HOUR = 1000 * 60 * 60

module.exports = async () => {
    const notifier = updateNotifier({ pkg, updateCheckInterval: ONE_HOUR })
        if (notifier.update && notifier.update.latest !== pkg.version) {
            notifier.notify({ defer: false, isGlobal: true })
        }
}