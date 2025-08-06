// db/db.js
// Establishes and exports a connection to the MySQL database using mysql2

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'chohan12',
  database: 'my_app'
});

// Connect with error handling
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    throw err;
  }
  console.log('🗄️ Connected to MySQL');
});

// Export both basic and promise-based interfaces
module.exports = {
  db,
  promiseDb: db.promise()
};
