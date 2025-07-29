const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
