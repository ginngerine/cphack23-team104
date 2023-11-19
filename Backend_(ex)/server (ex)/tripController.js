// Import necessary modules and models
const Trip = require('../models/Trip'); // Assuming you have a Trip model

// Controller function to get trip details by ID
const getTripById = async (req, res) => {
  try {
    const tripId = req.params.id; // Get the trip ID from the request parameters
    const trip = await Trip.findById(tripId); // Find the trip by ID in the database

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Return the trip details as JSON
    res.json(trip);
  } catch (error) {
    console.error('Error fetching trip details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the controller functions for use in routes
module.exports = {
  getTripById,
  // Add other trip-related controller functions here
};
