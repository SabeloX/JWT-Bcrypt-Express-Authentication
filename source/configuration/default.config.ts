/**Development Configuration for Evironment Variables */
export default {
    port: 3000,
    database: 'mongodb://127.0.0.1:27017/secure_api',
    tokenSecret: process.env.TOKEN_SECRET
}