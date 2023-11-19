const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API Documentation',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
  },
  // Specify API routes for which you want to generate documentation
  apis: ['./routes/*.js'], // Example: './routes/user.js', './routes/trip.js'
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
