// services/userService.js
// Contains business logic for user-related operations.
// Interacts with the userModel/database and performs data validation or transformation.

const db = require('../db/db');
const { validateUserData } = require('../helpers/validateUserData');

// Get all users
function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

// Get user by ID
function getUserById(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
      if (err) return reject(err);
      resolve(result[0] || {});
    });
  });
}

// Create a new user
function createUser(user) {
  return new Promise((resolve, reject) => {
    if (!validateUserData(user)) {
      return reject(new Error('Invalid user data'));
    }

    const { fn, ln, email, age, salary } = user;
    const sql = 'INSERT INTO users (fn, ln, email, age, salary) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [fn, ln, email, age, salary], (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId });
    });
  });
}

// Update user salary
function updateUserSalary(id, salary) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE users SET salary = ? WHERE id = ?';
    db.query(sql, [salary, id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserSalary,
};
