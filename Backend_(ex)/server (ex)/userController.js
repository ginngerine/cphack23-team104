// Import necessary modules and models
const User = require('../models/User'); // Assuming you have a User model

// Controller function to get a user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters
    const user = await User.findById(userId); // Find the user by ID in the database

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data as JSON
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the controller functions for use in routes
module.exports = {
  getUserById,
  // Add other user-related controller functions here
};
