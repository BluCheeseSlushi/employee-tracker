const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ilovemitzi0!',
  database: 'employeetracker'
});

module.exports = db;
