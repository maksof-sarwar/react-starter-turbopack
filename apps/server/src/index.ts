import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import health from 'fastify-healthcheck'
import fastify from 'fastify';
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import { appRouter } from './app';
import { createContext } from './conext'
import fastifyStatic from '@fastify/static'
import sensible from '@fastify/sensible'
import { join } from 'path';
const FRONTEND = join(process.cwd(), 'client');
const app = fastify({
  maxParamLength: 5000,
});
app.register(fastifyStatic, {
  root: FRONTEND,
});
app.register(sensible)
app.register(health, { healthcheckUrl: '/health', exposeUptime: true });
app.register(cors, { credentials: true, origin: '*', });

app.register(cookie, {
  secret: "my-secret",
  hook: 'onRequest',
  parseOptions: {}
})
app.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext, },
});
app.setNotFoundHandler((req, rep) => {
  console.log(FRONTEND)
  if (req.url.startsWith("/api")) {
    rep.notFound(`Route ${req.method}:${req.url} not found`)
  } else
    rep.status(200).sendFile("index.html");
});
// app.listen({ port: 3000, host: '0.0.0.0' })
export default async (req, res) => {

  await app.ready();
  app.server.emit('request', req, res);
}