"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_zod_1 = require("fastify-zod");
const swaggerOptions = (0, fastify_zod_1.withRefResolver)({
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
exports.default = swaggerOptions;
