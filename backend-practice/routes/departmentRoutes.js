// routes/departmentRoutes.js
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// 📦 CRUD Operations
router.get('/departments', departmentController.getAllDepartments);
router.get('/departments/:id', departmentController.getDepartmentById);
router.post('/departments', departmentController.createDepartment);
router.put('/departments/:id', departmentController.updateDepartment);
router.delete('/departments/:id', departmentController.deleteDepartment);

// 👥 Users in Department
router.get('/departments/:id/users', departmentController.getUsersInDepartment);
router.post('/departments/:id/users', departmentController.assignUsersToDepartment);

module.exports = router;
