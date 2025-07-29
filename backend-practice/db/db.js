// db/db.js
// Establishes and exports a connection to the MySQL database.
// Used by models and services to execute queries.

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'chohan12',
  database: 'my_app'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    throw err;
  }
  console.log('🗄️ Connected to MySQL');
});

module.exports = db;
