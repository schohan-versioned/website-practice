// helpers/helpers.js
// Contains shared utility functions like error handling and request logging.
// Used across the application for consistency and reusability.

function handleError(res, error, message = 'An error occurred', status = 500) {
  console.error(`${message}:`, error);
  res.status(status).json({ error: message });
}

function logRequest(req) {
  console.log(`${req.method} ${req.originalUrl} request received`);
}

module.exports = {
  handleError,
  logRequest,
};
