require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const userRouter = require('../routes/userRoutes'); // User Routes
const bookRouter = require('../routes/bookRoutes'); // Book Routes
const error = require('../middlewares/errorMiddleware');
require('../config/dbConnect')();

const app = express();
// Public Route
app.get('/public', (req, res) => {
  res.send('This is a public route.');
});

// Private Route (protected by authentication middleware)
app.get('/private', isAuthenticated, (req, res) => {
  res.send('This is a private route. You must be logged in to see this.');
});
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


// Middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));// Enable CORS for all routes
app.use(express.json()); // Parse JSON request body
app.get('/api', (req, res) => {
  res.send('Hello from Node.js on Vercel!');
});

// Routes
app.use('/api/users', userRouter); 
app.use('/api/books', bookRouter); 

// Static Files
const __dirname2 = path.resolve();
app.use('/uploads', express.static(path.join(__dirname2, '/uploads')));

// Deployment for Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname2, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname2, 'frontend', 'build', 'index.html'))
  );
} else {
  // Fallback for Development
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.get('/api/public-posts', (req, res) => {
  const publicPosts = [
    { id: 1, title: 'Public Post 1' },
    { id: 2, title: 'Public Post 2' },
  ];
  res.json(publicPosts);
});


// Error Handling Middlewares
app.use(error.notfoundErrorMiddleware);
app.use(error.errorMiddlewareHandler);

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
}

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;