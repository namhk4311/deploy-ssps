const mysql = require('mysql2');
require("dotenv").config();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'ssps_database'
});

module.exports = db.promise();