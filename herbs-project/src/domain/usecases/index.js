module.exports = [
    { usecase: require('./profile/createProfile'), tags: { group: 'Profiles', type: 'mutation'} },
    { usecase: require('./profile/updateProfile'), tags: { group: 'Profiles', type: 'mutation'} },
    { usecase: require('./profile/deleteProfile'), tags: { group: 'Profiles', type: 'mutation'} },
    { usecase: require('./profile/findOneProfile'), tags: { group: 'Profiles', type: 'query'} },
    { usecase: require('./room/createRoom'), tags: { group: 'Rooms', type: 'mutation'} },
    { usecase: require('./room/updateRoom'), tags: { group: 'Rooms', type: 'mutation'} },
    { usecase: require('./room/deleteRoom'), tags: { group: 'Rooms', type: 'mutation'} },
    { usecase: require('./room/findOneRoom'), tags: { group: 'Rooms', type: 'query'} },
    { usecase: require('./user/createUser'), tags: { group: 'Users', type: 'mutation'} },
    { usecase: require('./user/updateUser'), tags: { group: 'Users', type: 'mutation'} },
    { usecase: require('./user/deleteUser'), tags: { group: 'Users', type: 'mutation'} },
    { usecase: require('./user/findOneUser'), tags: { group: 'Users', type: 'query'} }
]