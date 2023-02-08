import { SwaggerOptions } from '@fastify/swagger';
import { withRefResolver } from 'fastify-zod';
const swaggerOptions: SwaggerOptions = withRefResolver({
  routePrefix: '/api/doc',
  hideUntagged: true,
  uiConfig: {
    persistAuthorization: true,
    filter: true,
  },
  openapi: {
    info: {
      title: 'API DOCUMENTATION',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0',
    },
    security: [],
    components: {
      securitySchemes: {
        auth: {
          type: 'http',
          bearerFormat: 'JWT',
          scheme: 'bearer',
        },

      },
    },

    servers: [],
  },
  exposeRoute: true,
});

export default swaggerOptions;