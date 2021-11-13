/**Testing Configuration for Evironment Variables */
export default {
    port: 3001,
    database: 'mongodb://127.0.0.1:27017/secure_api_test',
    tokenSecret: process.env.TOKEN_SECRET_TEST
}