import swaggerOptions from '@/src/helpers/swagger';
import { createContext } from '@/src/trpc/context';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import sensible from '@fastify/sensible';
import fastifySwagger from '@fastify/swagger';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { FastifyInstance } from 'fastify';
import health from 'fastify-healthcheck';
import { appRouter } from './trpc';
export default function registerPlugins(app: FastifyInstance) {
  app.register(fastifySwagger, swaggerOptions);
  app.register(sensible)
  app.register(health, { healthcheckUrl: '/health', exposeUptime: true });
  app.register(cors, { credentials: true, origin: '*', });
  app.register(jwt, {
    secret: 'secret',
    cookie: {
      cookieName: 'access-token',
      signed: false
    },
    sign: {
      expiresIn: '1mo'
    }
  })
  // app.register(session, { secret: 'a secret with minimum length of 32 characters' });
  app.register(cookie)
  app.register(fastifyTRPCPlugin, {
    prefix: '/api',
    trpcOptions: { router: appRouter, createContext, },
  });
  return app;
}