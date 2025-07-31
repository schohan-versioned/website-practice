const express = require('express');
const router = express.Router();
const userDepartmentController = require('../controllers/userDepartmentController');

// Get all departments for a user
router.get('/user/:id/departments', userDepartmentController.getDepartmentsByUserId);

// Assign user to departments (expects array in req.body.departmentIds)
router.post('/user/:id/departments', userDepartmentController.assignUserToDepartments);

// Remove user from a department
router.delete('/user/:id/departments/:deptId', userDepartmentController.removeUserFromDepartment);

// Get all users in a department
router.get('/department/:id/users', userDepartmentController.getUsersByDepartmentId);

module.exports = router;
