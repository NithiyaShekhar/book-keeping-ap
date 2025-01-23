require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const userRouter = require('../routes/userRoutes'); // User Routes
const bookRouter = require('../routes/bookRoutes'); // Book Routes
const error = require('../middlewares/errorMiddleware');
require('../config/dbConnect')();

const app = express();
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

// Error Handling Middlewares
app.use(error.notfoundErrorMiddleware);
app.use(error.errorMiddlewareHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;