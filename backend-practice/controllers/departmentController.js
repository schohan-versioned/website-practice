// controllers/departmentController.js
const { promiseDb } = require('../db/db');

// 🟢 Get all departments with user count
exports.getAllDepartments = async (req, res, next) => {
  try {
    const [rows] = await promiseDb.query(
      `SELECT d.id, d.name, COUNT(ud.user_id) AS user_count
       FROM departments d
       LEFT JOIN user_departments ud ON d.id = ud.department_id
       GROUP BY d.id`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// 🔍 Get department by ID
exports.getDepartmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await promiseDb.query(
      `SELECT * FROM departments WHERE id = ?`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Department not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// ➕ Create a department
exports.createDepartment = async (req, res, next) => {
  try {
    const { name } = req.body;
    const [result] = await promiseDb.query(
      `INSERT INTO departments (name) VALUES (?)`,
      [name]
    );
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    next(err);
  }
};

// 📝 Update department name
exports.updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await promiseDb.query(`UPDATE departments SET name = ? WHERE id = ?`, [name, id]);
    res.status(200).json({ message: 'Department updated' });
  } catch (err) {
    next(err);
  }
};

// ❌ Delete department
exports.deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await promiseDb.query(`DELETE FROM departments WHERE id = ?`, [id]);
    res.status(200).json({ message: 'Department deleted' });
  } catch (err) {
    next(err);
  }
};

// 👥 Get users in a department
exports.getUsersInDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await promiseDb.query(
      `SELECT u.id, u.fn, u.ln, u.email, u.age, u.salary, u.created_at
       FROM users u
       JOIN user_departments ud ON u.id = ud.user_id
       WHERE ud.department_id = ?`,
      [id]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// 🔗 Assign users to department (bulk)
exports.assignUsersToDepartment = async (req, res, next) => {
  try {
    const { id: departmentId } = req.params;
    const { userIds } = req.body; // expects: { userIds: [1, 2, 3] }

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: 'Invalid userIds array' });
    }

    const values = userIds.map(userId => [userId, departmentId]);

    await promiseDb.query(
      `INSERT IGNORE INTO user_departments (user_id, department_id) VALUES ?`,
      [values]
    );

    res.status(200).json({ message: 'Users assigned to department' });
  } catch (err) {
    next(err);
  }
};
