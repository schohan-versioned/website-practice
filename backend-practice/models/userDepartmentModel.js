const db = require('../db/db');

const getDepartmentsByUserId = (userId) => {
  return db.promise().query(
    `SELECT d.* FROM departments d
     JOIN user_departments ud ON d.id = ud.department_id
     WHERE ud.user_id = ?`, [userId]
  );
};

const getUsersByDepartmentId = (departmentId) => {
  return db.promise().query(
    `SELECT u.* FROM users u
     JOIN user_departments ud ON u.id = ud.user_id
     WHERE ud.department_id = ?`, [departmentId]
  );
};

const assignUserToDepartments = (userId, departmentIds) => {
  const values = departmentIds.map(depId => [userId, depId]);
  return db.promise().query(
    'INSERT IGNORE INTO user_departments (user_id, department_id) VALUES ?',
    [values]
  );
};

const removeUserFromDepartment = (userId, departmentId) => {
  return db.promise().query(
    'DELETE FROM user_departments WHERE user_id = ? AND department_id = ?',
    [userId, departmentId]
  );
};

module.exports = {
  getDepartmentsByUserId,
  getUsersByDepartmentId,
  assignUserToDepartments,
  removeUserFromDepartment,
};
