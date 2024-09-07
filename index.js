// app.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 

const PORT= process.env.PORT || 5000
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {-
    // listening for requests
    app.listen(PORT, (req, res) => {
      console.log(`Connected to DB && server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });



