// services/userService.js
// Business logic for user-related operations using promise-based MySQL interface

const { promiseDb } = require('../db/db');
const { validateUserData } = require('../helpers/validateUserData');

// Get all users
async function getAllUsers() {
  console.log('📥 Executing query for getAllUsers...');
  const [rows] = await promiseDb.query('SELECT * FROM users');
  return rows;
}

// Get user by ID
async function getUserById(id) {
  const [rows] = await promiseDb.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0] || {};
}

// Create a new user
async function createUser(user) {
  if (!validateUserData(user)) {
    throw new Error('Invalid user data');
  }

  const { fn, ln, email, age, salary } = user;
  const sql = 'INSERT INTO users (fn, ln, email, age, salary) VALUES (?, ?, ?, ?, ?)';
  const [result] = await promiseDb.query(sql, [fn, ln, email, age, salary]);
  return { id: result.insertId };
}

// Update user salary
async function updateUserSalary(id, salary) {
  const sql = 'UPDATE users SET salary = ? WHERE id = ?';
  await promiseDb.query(sql, [salary, id]);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserSalary
};
