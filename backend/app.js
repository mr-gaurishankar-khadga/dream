require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Import the three separated files
const registerRouter = require('./register');
const loginRouter = require('./login');
const linktreeRouter = require('./linktree');

const app = express();
const PORT = process.env.PORT;

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

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB createrhub database');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

// Use the imported routers
app.use('/api/users', registerRouter);
app.use('/api/users', loginRouter);
app.use('/api', linktreeRouter);








// Add the check username availability route
app.get('/api/check-username/:username', async (req, res) => {
  try {
    const CreaterhubProfile = mongoose.models.CreaterhubProfile;
    const profile = await CreaterhubProfile.findOne({ username: req.params.username });
    res.json({ available: !profile });
  } catch (err) {
    console.error('Error checking username:', err);
    res.status(500).json({ error: 'Server error' });
  }
});











// Add a simple root route that returns a 200 OK
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API server is running' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ error: 'Server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;