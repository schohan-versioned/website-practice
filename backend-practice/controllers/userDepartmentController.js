const userDepartmentModel = require('../models/userDepartmentModel');

// GET /user/:id/departments
const getDepartmentsByUserId = async (req, res) => {
  try {
    const [rows] = await userDepartmentModel.getDepartmentsByUserId(req.params.id);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching user departments:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /department/:id/users
const getUsersByDepartmentId = async (req, res) => {
  try {
    const [rows] = await userDepartmentModel.getUsersByDepartmentId(req.params.id);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching department users:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /user/:id/departments
const assignUserToDepartments = async (req, res) => {
  const userId = req.params.id;
  const departmentIds = req.body.departmentIds; // should be array

  if (!Array.isArray(departmentIds)) {
    return res.status(400).json({ error: 'departmentIds must be an array' });
  }

  try {
    await userDepartmentModel.assignUserToDepartments(userId, departmentIds);
    res.json({ message: 'Departments assigned' });
  } catch (err) {
    console.error('Error assigning departments:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /user/:id/departments/:deptId
const removeUserFromDepartment = async (req, res) => {
  const { id, deptId } = req.params;
  try {
    await userDepartmentModel.removeUserFromDepartment(id, deptId);
    res.json({ message: 'User removed from department' });
  } catch (err) {
    console.error('Error removing user from department:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getDepartmentsByUserId,
  getUsersByDepartmentId,
  assignUserToDepartments,
  removeUserFromDepartment,
};
