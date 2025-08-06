// middleware/errorHandler.js

module.exports = (err, req, res, next) => {
  console.error('❌ Error caught by errorHandler middleware:', err.stack);
  res.status(500).json({
    error: err.message || 'Internal Server Error',
  });
};
