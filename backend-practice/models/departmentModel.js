const db = require('../db/db');

const getAllDepartments = () => {
  return db.promise().query('SELECT * FROM departments');
};

const createDepartment = (name) => {
  return db.promise().query('INSERT INTO departments (name) VALUES (?)', [name]);
};

const updateDepartment = (id, name) => {
  return db.promise().query('UPDATE departments SET name = ? WHERE id = ?', [name, id]);
};

const deleteDepartment = (id) => {
  return db.promise().query('DELETE FROM departments WHERE id = ?', [id]);
};

module.exports = {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
