const userService = require('../services/userService');
const { handleError, logRequest } = require('../helpers/helpers');

module.exports = async (req, res) => {
  logRequest(req);
  try {
    const result = await userService.createUser(req.body);
    res.json(result);
  } catch (err) {
    handleError(res, err, 'Error inserting user');
  }
};
