const userService = require('../services/userService');
const { handleError, logRequest } = require('../helpers/helpers');

module.exports = async (req, res) => {
  logRequest(req);
  try {
    await userService.updateUserSalary(req.params.id, req.body.salary);
    res.sendStatus(200);
  } catch (err) {
    handleError(res, err, `Error updating user ${req.params.id}`);
  }
};
