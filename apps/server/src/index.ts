import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { appRouter } from './app';
import { createContext } from './conext'
import fastifyStatic from '@fastify/static'
import sensible from '@fastify/sensible'
import { join } from 'path';
const FRONTEND = join(process.cwd(), 'client');
const server = fastify({
  maxParamLength: 5000,
});
server.register(fastifyStatic, {
  root: FRONTEND,
});
server.register(sensible)
server.register(health, { healthcheckUrl: '/health', exposeUptime: true });
server.register(cors, { credentials: true, origin: '*', });

server.register(cookie, {
  secret: "my-secret",
  hook: 'onRequest',
  parseOptions: {}
})
server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext, },
});
server.setNotFoundHandler((req, rep) => {
  if (req.url.startsWith("/api")) {
    rep.notFound(`Route ${req.method}:${req.url} not found`)
  } else
    rep.status(200).sendFile("index.html");
});
(async () => {
  try {
    await server.listen({ port: 3000 });
    console.log('listening on port 3000')
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();


// Export the Express API
export default app