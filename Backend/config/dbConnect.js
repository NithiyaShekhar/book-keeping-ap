const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is configured to load environment variables

const dbConnect = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Check this variable
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = dbConnect;
