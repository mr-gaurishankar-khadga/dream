// register.js - User registration routes for CreaterHub
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// JWT Secret from environment or default
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    // Check if email or username already exists
    const existingUser = await req.app.locals.CreaterhubUser.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already in use' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = new req.app.locals.CreaterhubUser({
      email,
      username,
      password: hashedPassword
    });
    
    await user.save();
    
    // Create default profile for the user
    const profile = new req.app.locals.CreaterhubProfile({
      userId: user._id,
      username,
      name: username,
      tagline: 'My CreaterHub',
      profileImage: '/uploads/default-profile.png',
      backgroundColor: '#2563eb',
      accentColor: '#d9f99d',
      products: [],
      socialLinks: []
    });
    
    await profile.save();
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;