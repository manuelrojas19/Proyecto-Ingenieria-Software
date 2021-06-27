const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Comisiones Express API',
      version: '2.1.0',
      description: 'Express API para el backend del Sistema de Comisiones',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Manuel Rojas',
        email: 'manuelarr99@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:{port}/{basePath}',
        description: 'Servidor para desarrollo',
        variables: {
          port: {
            enum: ['3000'],
            default: '3000',
          },
          basePath: {
            enum: ['api/v2'],
            default: 'api/v2',
          },
        },
      },
    ],
  },
  apis: ['./resources/documentation/*.yml'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
