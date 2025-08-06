// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const userDepartmentRoutes = require('./routes/userDepartmentRoutes');

const db = require('./db/db');
const errorHandler = require('./middleware/errorHandler'); // NEW: error handling middleware

const app = express();
const port = 3001;

// 🌐 Middleware setup
console.log('🔧 Setting up middleware...');
app.use(cors());
app.use(bodyParser.json());

// (Optional) Log every incoming request
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// 🚏 API Routes
app.use('/', userRoutes);
app.use('/', departmentRoutes);         // ✅ Now properly enabled
app.use('/', userDepartmentRoutes);

// ❌ Remove test route
// app.get('/departments', (req, res) => { ... });

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// 🛑 Global Error Handler (NEW)
app.use(errorHandler);

// 🚀 Server Start
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
