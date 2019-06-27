const { Pool } = require('pg')

let pool = new Pool({
    host : "localhost",
    port : 5432,
    user : "postgres",
    password : "root",
    database : "user_app",
    max: 100
})

module.exports = pool