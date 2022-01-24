require('dotenv').config();

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Client list API with Swagger',
    version: '1.0.0',
    description:
      'This is CRUD API for application to manage clients and their providers, made with Express and documented with Swagger',
    license: {
      name: 'ISC',
      url: 'https://www.isc.org/licenses/',
    },
    contact: {
      name: 'Pavlov A.S.',
      email: 'alex.pavlov.1009@gmail.com',
    },
  },
  servers: [
    {
      url: `${process.env.BASE_URL}:${process.env.PORT}`,
      description: 'Development server',
    },
  ],
};
