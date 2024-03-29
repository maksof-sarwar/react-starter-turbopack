import { prisma } from './database/client';
import registerPlugins from './plugins';
import { PrismaClient } from '@prisma/client';
import fastify, { FastifyInstance } from 'fastify';
import http from 'http';
class App {
  static instance: App;
  private _app!: FastifyInstance;
  prisma: PrismaClient = prisma
  private PORT: number = Number(process.env.PORT || 3000)

  constructor() {
    App.instance = this;
    this._app = registerPlugins(fastify({ maxParamLength: 5000, }));

  }
  async startServer() {
    try {
      await this._app.ready();
      await this._app.listen({ port: this.PORT, host: '0.0.0.0' })
      console.log(`\x1b[44m\x1b[1m\x1b[4m 🚀[server] is running on port : ${this.PORT}\x1b[0m`);
    } catch (err: any) {
      throw new Error(err)
    }
  }
  get app(): FastifyInstance {
    if (!this._app) throw new Error(`App not initialized`);
    return this._app;
  }
}

export default App;