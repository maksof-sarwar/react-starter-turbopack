"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __importDefault(require("../src/helpers/swagger"));
const context_1 = require("../src/trpc/context");
const cookie_1 = __importDefault(require("@fastify/cookie"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const sensible_1 = __importDefault(require("@fastify/sensible"));
const swagger_2 = __importDefault(require("@fastify/swagger"));
const fastify_1 = require("@trpc/server/adapters/fastify");
const fastify_healthcheck_1 = __importDefault(require("fastify-healthcheck"));
const _app_1 = require("./router/_app");
function registerPlugins(app) {
    app.register(swagger_2.default, swagger_1.default);
    app.register(sensible_1.default);
    app.register(fastify_healthcheck_1.default, { healthcheckUrl: '/health', exposeUptime: true });
    app.register(cors_1.default, { credentials: true, origin: true, });
    app.register(jwt_1.default, {
        secret: 'secret',
    });
    app.register(cookie_1.default);
    app.register(fastify_1.fastifyTRPCPlugin, {
        prefix: '/api',
        trpcOptions: { router: _app_1.appRouter, createContext: context_1.createContext, },
    });
    return app;
}
exports.default = registerPlugins;
