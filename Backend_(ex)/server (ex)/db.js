// db.js

const mongoose = require('mongoose');

// Define the MongoDB connection URL. You can store this in an environment variable.
const mongoURI = process.env.MONGODB_URI;

// Create a function to establish the database connection
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Export the database connection function
module.exports = {
  connectToDatabase,
};
