// userModel.js
// (Optional in your case) Directly performs SQL queries on the users table.
// Used by the service layer to access and manipulate database records.

const db = require('../db/db');

const UserModel = {
  getAll: (callback) => {
    db.query('SELECT * FROM users', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },

  create: ({ fn, ln, email, age, salary }, callback) => {
    const sql = 'INSERT INTO users (fn, ln, email, age, salary) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [fn, ln, email, age, salary], callback);
  },

  updateSalary: (id, salary, callback) => {
    const sql = 'UPDATE users SET salary = ? WHERE id = ?';
    db.query(sql, [salary, id], callback);
  },

  deleteById: (id, callback) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = UserModel;