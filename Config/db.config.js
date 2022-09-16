const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config();

let db = mysql.createConnection({
    host: process.env.Host,
    port: process.env.Port,
    user: process.env.User,
    password: process.env.Password,
    database: process.env.Database
});

db.connect()

module.exports = { db }