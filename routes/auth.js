// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'my_jwt_secret';

// Sign Up Route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // console.log(firstName, lastName, email, password);
  try {
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error: 'User already exists or invalid data'  });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, firstName: user.firstName, lastName: user.lastName },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
