async function factory(conn) {
    return {
    profileRepository: await new (require('./profileRepository.js'))(conn),
    roomRepository: await new (require('./roomRepository.js'))(conn),
    userRepository: await new (require('./userRepository.js'))(conn)
}
}
module.exports = factory