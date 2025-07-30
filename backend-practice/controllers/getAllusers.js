const userService = require('../services/userService');
const { handleError, logRequest } = require('../helpers/helpers');

module.exports = async (req, res) => {
  logRequest(req);
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    handleError(res, err, 'Error fetching users');
  }
};
