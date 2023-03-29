/// <reference types="node" />
import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
type CreateContextOptions = {
    req: CreateFastifyContextOptions['req'];
    res: CreateFastifyContextOptions['res'];
    user: {
        token: string | undefined;
    };
};
export declare const createContextInner: (opts: CreateContextOptions) => Promise<{
    prisma: import("@prisma/client").PrismaClient<{
        errorFormat: "pretty";
    }, never, false>;
    req: CreateFastifyContextOptions['req'];
    res: CreateFastifyContextOptions['res'];
    user: {
        token: string | undefined;
    };
}>;
export declare function createContext({ req, res }: CreateFastifyContextOptions): Promise<{
    prisma: import("@prisma/client").PrismaClient<{
        errorFormat: "pretty";
    }, never, false>;
    req: import("fastify").FastifyRequest<import("fastify").RouteGenericInterface, import("fastify").RawServerDefault, import("http").IncomingMessage, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown, import("fastify").FastifyBaseLogger, import("fastify/types/type-provider").ResolveFastifyRequestType<import("fastify").FastifyTypeProviderDefault, import("fastify").FastifySchema, import("fastify").RouteGenericInterface>>;
    res: import("fastify").FastifyReply<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown>;
    user: {
        token: string | undefined;
    };
}>;
export type Context = inferAsyncReturnType<typeof createContext>;
export {};
//# sourceMappingURL=context.d.ts.map