// routes/departmentRoutes.js
// Handles all /departments routes and maps them to controller functions.

const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// GET all departments
router.get('/departments', departmentController.getAllDepartments);

// POST a new department
router.post('/departments', departmentController.createDepartment);

// PUT (update) a department by ID
router.put('/departments/:id', departmentController.updateDepartment);

// DELETE a department by ID
router.delete('/departments/:id', departmentController.deleteDepartment);

module.exports = router;
