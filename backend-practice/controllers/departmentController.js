const departmentModel = require('../models/departmentModel');

// GET /departments
const getAllDepartments = async (req, res) => {
    console.log('🔥 Controller: GET /departments hit'); // DEBUG LOG
  try {
    const [rows] = await departmentModel.getAllDepartments();
    res.json(rows);
  } catch (err) {
    console.error('Error fetching departments:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /departments
const createDepartment = async (req, res) => {
  const { name } = req.body;

  console.log('📥 POST /departments called with body:', req.body);

  if (!name) {
    return res.status(400).json({ error: 'Department name is required' });
  }

  try {
    await departmentModel.createDepartment(name);
    res.status(201).json({ message: 'Department created' });
  } catch (err) {
    console.error('❌ Error creating department:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /departments/:id
const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await departmentModel.updateDepartment(id, name);
    res.json({ message: 'Department updated' });
  } catch (err) {
    console.error('Error updating department:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /departments/:id
const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    await departmentModel.deleteDepartment(id);
    res.json({ message: 'Department deleted' });
  } catch (err) {
    console.error('Error deleting department:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
