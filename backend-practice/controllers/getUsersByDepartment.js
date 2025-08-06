// controllers/getUsersByDepartment.js
const { promiseDb } = require('../db/db');

module.exports = async (req, res, next) => {
  try {
    const { deptId } = req.params;

    const [results] = await promiseDb.query(
      `SELECT u.id, u.fn, u.ln, u.email, u.age, u.salary, u.created_at,
              GROUP_CONCAT(d.name SEPARATOR ', ') AS departments
       FROM users u
       INNER JOIN user_departments ud ON u.id = ud.user_id
       INNER JOIN departments d ON d.id = ud.department_id
       WHERE d.id = ?
       GROUP BY u.id`,
      [deptId]
    );

    res.json(results);
  } catch (err) {
    next(err);
  }
};
