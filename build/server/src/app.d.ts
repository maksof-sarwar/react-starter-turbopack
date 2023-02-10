import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
declare class App {
    static instance: App;
    private _app;
    prisma: PrismaClient;
    private PORT;
    constructor();
    startServer(): Promise<void>;
    get app(): FastifyInstance;
}
export default App;
//# sourceMappingURL=app.d.ts.map