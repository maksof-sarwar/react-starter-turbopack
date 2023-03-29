import swaggerOptions from '@/src/helpers/swagger';
import { createContext } from '@/src/trpc/context';
import cookie from '@fastify/cookie';
import session from '@fastify/session';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import sensible from '@fastify/sensible';
import fastifySwagger from '@fastify/swagger';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { FastifyInstance } from 'fastify';
import health from 'fastify-healthcheck';
import { appRouter } from './router/_app';
export default function registerPlugins(app: FastifyInstance) {
  app.register(fastifySwagger, swaggerOptions);
  app.register(sensible)
  app.register(health, { healthcheckUrl: '/health', exposeUptime: true });
  app.register(cors, { credentials: true, origin: true, });
  app.register(jwt, {
    secret: 'secret',
  })
  app.register(cookie)

  app.register(fastifyTRPCPlugin, {
    prefix: '/api',
    trpcOptions: { router: appRouter, createContext, },
  });
  return app;
}