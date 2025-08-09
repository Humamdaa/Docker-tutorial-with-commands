// index.js
require('dotenv').config(); // Load .env
const express = require('express');
const connectDB = require('./server'); // Import DB connection

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Hello from Express + MongoDB!</h1>');
});

// Connect to DB, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
