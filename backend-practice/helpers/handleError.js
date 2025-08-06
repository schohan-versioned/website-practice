// helpers/helpers.js
function handleError(res, err, message = 'Server Error') {
  console.error('❌ FULL ERROR:', err); // Make sure this is there
  res.status(500).json({ error: message });
}
