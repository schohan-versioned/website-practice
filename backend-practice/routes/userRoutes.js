// routes/userRoutes.js
// Defines API endpoints related to users

const express = require('express');
const router = express.Router();
const userController = require('../controllers');

// 🧾 Basic CRUD
router.get('/users', userController.getAllUsers);                     // All users (with departments)
router.get('/users/:id', userController.getUserById);                 // Single user
router.post('/users', userController.createUser);                     // Create user
router.put('/users/:id', userController.updateUser);                  // Update user (salary, name, dept)
router.delete('/users/:id', userController.deleteUser);               // Delete user

// 🔍 Extras for frontend
router.get('/users/search/:query', userController.searchUsers);       // Search by name/email
router.get('/users/filter/department/:deptId', userController.getUsersByDepartment); // Filter by department

module.exports = router;
