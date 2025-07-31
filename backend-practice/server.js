// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const userDepartmentRoutes = require('./routes/userDepartmentRoutes');
const db = require('./db/db'); // use ./ instead of ../


const app = express();
const port = 3001;

console.log('🔧 Setting up middleware...');
app.use(cors());
app.use(bodyParser.json());
app.use('/', userRoutes);

app.get('/departments', (req, res) => {
  console.log('🔥 Inline test route hit');
  res.json([{ id: 1, name: 'Test Department' }]);
});


app.use('/', departmentRoutes);
app.use('/', userDepartmentRoutes);

console.log('✅ Middleware ready');

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});


app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
