module.exports =  async ({ generate }) => async () => {
    if(postgres) {
        await generate({
            template: `data/database/postgres/database.ejs`,
            target: `src/data/database/index.js`,
        })  
    }
}
