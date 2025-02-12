require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const router = express.Router();
const userRouter = require('./routes/userRoutes');
const bookRouter = require('./routes/bookRoutes');
const error = require('./middlewares/errorMiddleware');
require('./config/dbConnect')();

const app = express();

app.use(cors());

// Middleware
app.use(cors({
  origin: ['http://localhost:3000','https://book-keeping-app-82hs.onrender.com'], 
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type']
}));
app.use(express.json()); 

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
