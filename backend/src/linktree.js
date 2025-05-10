
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
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





// Get current user profile
router.get('/profile/me', async (req, res) => {
  try {
    const profile = await req.app.locals.CreaterhubProfile.findOne({ userId: req.user._id });
    
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
router.get('/profile/:username', async (req, res) => {
  try {
    const profile = await req.app.locals.CreaterhubProfile.findOne({ username: req.params.username });
    
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
router.put('/profile', async (req, res) => {
  try {
    const { name, tagline, backgroundColor, accentColor, username } = req.body;
    
    let profile = await req.app.locals.CreaterhubProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    // Check if username is being updated and if it's already taken
    if (username && username !== profile.username) {
      const existingProfile = await req.app.locals.CreaterhubProfile.findOne({ username });
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
router.post('/profile/image', upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    
    let profile = await req.app.locals.CreaterhubProfile.findOne({ userId: req.user._id });
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
router.post('/social-links', async (req, res) => {
  try {
    const { platform, url } = req.body;
    
    let profile = await req.app.locals.CreaterhubProfile.findOne({ userId: req.user._id });
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
router.put('/social-links/reorder', async (req, res) => {
  try {
    const { links } = req.body;
    
    let profile = await req.app.locals.CreaterhubProfile.findOne({ userId: req.user._id });
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
router.put('/social-links/:id', async (req, res) => {
  try {
    const { platform, url } = req.body;
    
    let profile = await req.app.locals.CreaterhubProfile.findOne({ userId: req.user._id });
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
router.delete('/social-links/:id', async (req, res) => {
  try {
    let profile = await req.app.locals.CreaterhubProfile.findOne({ userId: req.user._id });
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
router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { title, price, link } = req.body;
    
    let profile = await req.app.locals.CreaterhubProfile.findOne({ userId: req.user._id });
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
router.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, price, link } = req.body;
    
    let profile = await req.app.locals.CreaterhubProfile.findOne({ userId: req.user._id });
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
router.delete('/products/:id', async (req, res) => {
  try {
    let profile = await req.app.locals.CreaterhubProfile.findOne({ userId: req.user._id });
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

module.exports = router;