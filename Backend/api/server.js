require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const userRouter = require('../routes/userRoutes'); // User Routes
const bookRouter = require('../routes/bookRoutes'); // Book Routes
const error = require('../middlewares/errorMiddleware');
require('../config/dbConnect')();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body

// Dynamic CORS Configuration
const allowedOrigins = [
  'http://localhost:3000', // Local development frontend
  'https://book-keeping-ap-finale.vercel.app/', // Replace with your production domain
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies
  })
);

// Public Route
app.get('/public', (req, res) => {
  res.send('This is a public route.');
});

// Private Route (protected by authentication middleware)
app.get('/private', isAuthenticated, (req, res) => {
  res.send('This is a private route. You must be logged in to see this.');
});

// Routes
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);

// Public Posts Endpoint
app.get('/api/public-posts', (req, res) => {
  const publicPosts = [
    { id: 1, title: 'Public Post 1' },
    { id: 2, title: 'Public Post 2' },
  ];
  res.json(publicPosts);
});

// Static Files for Uploaded Content
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

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
}

// Error Handling Middlewares
app.use(error.notfoundErrorMiddleware);
app.use(error.errorMiddlewareHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
