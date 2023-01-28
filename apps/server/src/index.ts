import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import health from 'fastify-healthcheck'
import fastify from 'fastify';
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import { appRouter } from './app';
import { createContext } from './conext'
import Turn from 'node-turn'

const server = fastify({
  maxParamLength: 5000,
});
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
(async () => {
  try {
    var turnServer = new Turn({
      authMech: 'long-term',
      credentials: {
        username: "password",
      },
      listeningPort: 9000,
      debugLevel: 'ALL'
    });
    turnServer.start();
    await server.listen({ port: 3000 });
    console.log('listening on port 3000')
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();