const mysql = require('mysql2');
require("dotenv").config();

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'ssps_database',
    dateStrings: ['DATETIME']
});

module.exports = db.promise();