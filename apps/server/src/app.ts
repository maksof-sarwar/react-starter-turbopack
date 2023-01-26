import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './conext';
const t = initTRPC.context<Context>();
export const { router, middleware, mergeRouters, ...trpc } = t.create();
export const publicProcedure = trpc.procedure;
const isAuthed = middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
export const protectedProcedure = trpc.procedure.use(isAuthed)

import { userRouter } from './user';

export const appRouter = router({
  auth: userRouter(),
});

export type AppRouter = typeof appRouter;