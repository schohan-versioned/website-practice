const userService = require('../services/userService');
const { handleError, logRequest } = require('../helpers/helpers');

module.exports = async (req, res) => {
  logRequest(req);
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    handleError(res, err, `Error fetching user ${req.params.id}`);
  }
};
