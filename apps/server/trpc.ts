import { appRouter } from './src/trpc';
import { Context } from './src/trpc/context';
import { TRPCError, initTRPC } from '@trpc/server';

export const t = initTRPC.context<Context>().create();
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user.token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  return next();
});

export const protectedProcedure = t.procedure.use(isAuthed);
export type AppRouter = typeof appRouter;

