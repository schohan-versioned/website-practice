// routes/userRoutes.js
// Defines API endpoints related to users and maps them to the appropriate controller functions.

const express = require('express');
const router = express.Router();
const userController = require('../controllers'); // now pulling from index.js

router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.post('/createuser', userController.createUser);
router.put('/updateuser/:id', userController.updateUserSalary);
router.delete('/user/:id', userController.deleteUserById);

module.exports = router;
