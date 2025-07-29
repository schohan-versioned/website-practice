// controllers/userController.js
// Handles incoming HTTP requests and responses for user-related operations.
// Delegates business logic to the userService layer and logs requests.


const userService = require('../services/userService');
const { handleError, logRequest } = require('../helpers/helpers');

exports.getAllUsers = async (req, res) => {
  logRequest(req);
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    handleError(res, err, 'Error fetching users');
  }
};

exports.getUserById = async (req, res) => {
  logRequest(req);
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    handleError(res, err, `Error fetching user ${req.params.id}`);
  }
};

exports.createUser = async (req, res) => {
  logRequest(req);
  try {
    const result = await userService.createUser(req.body);
    res.json(result);
  } catch (err) {
    handleError(res, err, 'Error inserting user');
  }
};

exports.updateUserSalary = async (req, res) => {
  logRequest(req);
  try {
    await userService.updateUserSalary(req.params.id, req.body.salary);
    res.sendStatus(200);
  } catch (err) {
    handleError(res, err, `Error updating user ${req.params.id}`);
  }
};
