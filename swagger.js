const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  info: {
    title: 'Movie API',
    version: '1.0.0',
    description: 'API documentation for the Movie service',
  },
  basePath: '/api/v1',
  servers: [
    {
      url: "http://52.14.102.181:3001",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./api/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
