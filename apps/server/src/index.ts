import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import health from 'fastify-healthcheck'
import fastify from 'fastify';
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import { appRouter } from './app';
import { createContext } from './conext'
import Turn from 'node-turn'
import fastifyStatic from '@fastify/static'
import { join } from 'path';
const FRONTEND = join(process.cwd(), 'client');
const server = fastify({
  maxParamLength: 5000,
});
server.register(fastifyStatic, {
  root: FRONTEND,
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
server.setNotFoundHandler((req, rep) => {
  // API 404
  // if (req.raw.url && req.raw.url.startsWith("/api")) {
  //   return rep.status(404).send({
  //     success: false,
  //     error: {
  //       kind: "user_input",
  //       message: "Not Found",
  //     },
  //   });
  // }
  console.log(join(FRONTEND, "index.html"))
  rep.status(200).sendFile("index.html");
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