const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// GET route for displaying the registration form
router.get('/register', (req, res) => {
  res.render('register'); // Assuming you have a registration form template (e.g., register.ejs)
});

// POST route for user registration
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Create a new user with the provided username
  const newUser = new User({ username });

  // Register the user using Passport's convenience method
  User.register(newUser, password, (err, user) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.redirect('/register'); // Redirect back to the registration page on registration failure
    }
    // If registration is successful, authenticate and redirect to the user's profile page
    passport.authenticate('local')(req, res, () => {
      res.redirect('/profile');
    });
  });
});

module.exports = router;
