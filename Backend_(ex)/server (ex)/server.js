// Require dotenv at the top of the file
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Body parser middleware to handle JSON data
app.use(express.json());

// Function for getting trip suggestions (to be replaced with actual ChatGPT API integration)
const getTripSuggestions = async (tripDetails) => {
  // Use the API key from environment variables
  const apiKey = process.env.CHATGPT_API_KEY;
  
  // For now, returning a mock response
  return { itinerary: `Mock itinerary for trip to ${tripDetails.destination}` };
};

// Endpoint for trip planning
app.post('/plan-trip', async (req, res) => {
  try {
    const tripDetails = req.body;
    const suggestions = await getTripSuggestions(tripDetails);
    res.json(suggestions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const { swaggerUi, specs } = require('./swaggerConfig');

// Serve API documentation using Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/User'); // Assuming you have a User model

// Configure Passport.js
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set up express-session middleware
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

// Add authentication routes and middleware as needed
// server.js

// ... (other middleware and route setup)

// Global error handling middleware for 404 errors (Not Found)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Global error handling middleware for 500 errors (Internal Server Error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// routes/user.js

const express = require('express');
const router = express.Router();

// Route to get a user by ID
router.get('/:id', (req, res, next) => {
  const userId = req.params.id;

  if (!isValidUserId(userId)) {
    const err = new Error('Invalid user ID');
    err.status = 400; // Set the status code for the error
    return next(err); // Pass the error to the next middleware (global error handler)
  }

  // Handle the request
  res.json({ message: 'User found' });
});

module.exports = router;
