import { appRouter } from '@/src/trpc';
import { Context } from '@/src/trpc/context';
import { initTRPC } from '@trpc/server';

export const t = initTRPC.context<Context>().create();
export type AppRouter = typeof appRouter;

