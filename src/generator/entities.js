module.exports = async ({ generate } ) => async () => {
    await generate({
        template: 'entities/user.ejs',
        target: `src/domain/entities/user.js`
    })
    await generate({
        template: 'entities/index.ejs',
        target: `src/domain/entities/index.js`
    })
}
