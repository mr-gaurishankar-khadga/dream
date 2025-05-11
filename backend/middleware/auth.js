const jwt = require('jsonwebtoken');
const { CreaterhubUser } = require('../login');

// Authentication Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await CreaterhubUser.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = auth;