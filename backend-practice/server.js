// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // new route file

const app = express();
const port = 3001;

console.log('🔧 Setting up middleware...');
app.use(cors());
app.use(bodyParser.json());
console.log('✅ Middleware ready');

app.use('/', userRoutes); // use new route file

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
