// helpers/logger.js
// Logs incoming HTTP request details (method, URL, timestamp) for monitoring and debugging.


function logRequest(method, endpoint, data = null) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${method} ${endpoint}`);
  if (data) console.log('Payload:', data);
}

module.exports = {
  logRequest,
};
