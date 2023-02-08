import swaggerOptions from '@/src/helpers/swagger';
import { createContext } from '@/src/trpc/context';
import cors from '@fastify/cors';
import session from '@fastify/session';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import sensible from '@fastify/sensible';
import fastifyStatic from '@fastify/static';
import fastifySwagger from '@fastify/swagger';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { FastifyInstance } from 'fastify';
import health from 'fastify-healthcheck';
import { join } from 'path';
import { appRouter } from './trpc';
const FRONTEND = join(process.cwd(), 'build', 'web');
console.log(FRONTEND)
export default function registerPlugins(app: FastifyInstance) {
  app.register(fastifySwagger, swaggerOptions);
  app.register(fastifyStatic, {
    root: FRONTEND,
  });
  app.register(sensible)
  app.register(health, { healthcheckUrl: '/health', exposeUptime: true });
  app.register(cors, { credentials: true, origin: '*', });
  app.register(jwt, {
    secret: 'secret',
    cookie: {
      cookieName: 'refresh-token',
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