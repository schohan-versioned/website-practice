// controllers/searchUsers.js
const { promiseDb } = require('../db/db');

module.exports = async (req, res, next) => {
  try {
    const { query } = req.params;
    const [results] = await promiseDb.query(
      `SELECT u.id, u.fn, u.ln, u.email, u.age, u.salary, u.created_at,
              GROUP_CONCAT(d.name SEPARATOR ', ') AS departments
       FROM users u
       LEFT JOIN user_departments ud ON u.id = ud.user_id
       LEFT JOIN departments d ON d.id = ud.department_id
       WHERE u.fn LIKE ? OR u.ln LIKE ? OR u.email LIKE ?
       GROUP BY u.id`,
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );

    res.json(results);
  } catch (err) {
    next(err);
  }
};
