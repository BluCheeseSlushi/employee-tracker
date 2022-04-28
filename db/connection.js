const mysql = require('mysql2');
// require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ilovemitzi0!',
  database: 'election'
});

module.exports = db;
