import swaggerOptions from '@/src/helpers/swagger';
import { createContext } from '@/src/trpc/context';
import cookie from '@fastify/cookie';
import session from '@fastify/session';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import sensible from '@fastify/sensible';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { FastifyInstance } from 'fastify';
import health from 'fastify-healthcheck';
import { appRouter } from './router/_app';
import { renderTrpcPanel } from 'trpc-panel';

export default function registerPlugins(app: FastifyInstance) {
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
  app.get("/panel", (_, res) => {
    return res.type('text/html').send(
      renderTrpcPanel(appRouter, { url: "http://localhost:5000/api", transformer: "superjson", logFailedProcedureParse: true })
    );
  });
  return app;
}