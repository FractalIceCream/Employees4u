const mysql = require('mysql2');
const connect = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employee_db'
    },
    console.log('Connected to employee_db')
);
const db = connect.promise();
module.exports = db;