require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Connect to MongoDB - Changed database name to createrhub
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB createrhub database');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Schemas and Models - Updated with createrhub prefix
const createrhubProductSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  price: Number,
  link: String
});

const createrhubSocialLinkSchema = new mongoose.Schema({
  platform: String,
  url: String,
  order: Number
});

const createrhubProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CreaterhubUser',
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  tagline: String,
  profileImage: String,
  backgroundColor: String,
  accentColor: String,
  products: [createrhubProductSchema],
  socialLinks: [createrhubSocialLinkSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const createrhubUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CreaterhubUser = mongoose.model('CreaterhubUser', createrhubUserSchema);
const CreaterhubProfile = mongoose.model('CreaterhubProfile', createrhubProfileSchema);

// Authentication Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
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

// Routes
// User Registration
app.post('/api/users/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    // Check if email or username already exists
    const existingUser = await CreaterhubUser.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already in use' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = new CreaterhubUser({
      email,
      username,
      password: hashedPassword
    });
    
    await user.save();
    
    // Create default profile for the user
    const profile = new CreaterhubProfile({
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

// User Login
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await CreaterhubUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user profile
app.get('/api/profile/me', auth, async (req, res) => {
  try {
    const profile = await CreaterhubProfile.findOne({ userId: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get profile by username (public)
app.get('/api/profile/:username', async (req, res) => {
  try {
    const profile = await CreaterhubProfile.findOne({ username: req.params.username });
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
app.put('/api/profile', auth, async (req, res) => {
  try {
    const { name, tagline, backgroundColor, accentColor, username } = req.body;
    
    let profile = await CreaterhubProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    // Check if username is being updated and if it's already taken
    if (username && username !== profile.username) {
      const existingProfile = await CreaterhubProfile.findOne({ username });
      if (existingProfile) {
        return res.status(400).json({ error: 'Username already taken' });
      }
      profile.username = username;
    }
    
    profile.name = name || profile.name;
    profile.tagline = tagline || profile.tagline;
    profile.backgroundColor = backgroundColor || profile.backgroundColor;
    profile.accentColor = accentColor || profile.accentColor;
    
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload profile image
app.post('/api/profile/image', auth, upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    
    let profile = await CreaterhubProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    profile.profileImage = imageUrl;
    await profile.save();
    
    res.json({ imageUrl });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Social Links
// Add a new social link
app.post('/api/social-links', auth, async (req, res) => {
  try {
    const { platform, url } = req.body;
    
    let profile = await CreaterhubProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    // Find the highest order value
    const maxOrder = profile.socialLinks.length > 0 
      ? Math.max(...profile.socialLinks.map(link => link.order))
      : 0;
    
    profile.socialLinks.push({
      platform,
      url,
      order: maxOrder + 1
    });
    
    await profile.save();
    res.json(profile.socialLinks);
  } catch (err) {
    console.error('Error adding social link:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update social links order
app.put('/api/social-links/reorder', auth, async (req, res) => {
  try {
    const { links } = req.body;
    
    let profile = await CreaterhubProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    // Update the order of each social link
    links.forEach(link => {
      const existingLink = profile.socialLinks.id(link._id);
      if (existingLink) {
        existingLink.order = link.order;
      }
    });
    
    await profile.save();
    res.json(profile.socialLinks);
  } catch (err) {
    console.error('Error reordering social links:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a social link
app.put('/api/social-links/:id', auth, async (req, res) => {
  try {
    const { platform, url } = req.body;
    
    let profile = await CreaterhubProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    const link = profile.socialLinks.id(req.params.id);
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }
    
    link.platform = platform || link.platform;
    link.url = url || link.url;
    
    await profile.save();
    res.json(link);
  } catch (err) {
    console.error('Error updating social link:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a social link
app.delete('/api/social-links/:id', auth, async (req, res) => {
  try {
    let profile = await CreaterhubProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    profile.socialLinks = profile.socialLinks.filter(
      link => link._id.toString() !== req.params.id
    );
    
    await profile.save();
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting social link:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Product routes
// Add a product
app.post('/api/products', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, price, link } = req.body;
    
    let profile = await CreaterhubProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    
    profile.products.push({
      imageUrl,
      title,
      price: parseFloat(price),
      link
    });
    
    await profile.save();
    res.json(profile.products);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a product
app.put('/api/products/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, price, link } = req.body;
    
    let profile = await CreaterhubProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    const product = profile.products.id(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (req.file) {
      product.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    product.title = title || product.title;
    product.price = price ? parseFloat(price) : product.price;
    product.link = link || product.link;
    
    await profile.save();
    res.json(product);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a product
app.delete('/api/products/:id', auth, async (req, res) => {
  try {
    let profile = await CreaterhubProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    profile.products = profile.products.filter(
      product => product._id.toString() !== req.params.id
    );
    
    await profile.save();
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Check username availability
app.get('/api/check-username/:username', async (req, res) => {
  try {
    const profile = await CreaterhubProfile.findOne({ username: req.params.username });
    res.json({ available: !profile });
  } catch (err) {
    console.error('Error checking username:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the client build directory
  app.use(express.static(path.resolve(__dirname, '../client/dist')));
  
  // Handle any remaining requests with the React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;