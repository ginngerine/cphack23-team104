const express = require('express');
const passport = require('passport');
const router = express.Router();

// GET route for displaying the login form
router.get('/login', (req, res) => {
  res.render('login'); // Assuming you have a login form template (e.g., login.ejs)
});

// POST route for user login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/profile', // Redirect to the user's profile page on successful login
    failureRedirect: '/login',  // Redirect back to the login page on failed login
    failureFlash: true,         // Enable flash messages for displaying error messages
  })
);

module.exports = router;
