import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import { z } from 'zod';
import { prisma } from './prisma-client';
import { Context } from './conext';
const t = initTRPC.context<Context>();
export const { router, procedure, middleware, mergeRouters } = t.create();
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
const userRouter = router({
  login: procedure.input(
    z.object({
      email: z.string(),
      password: z.string()
    })
  ).mutation(async ({ ctx, }) => {
    console.log(ctx.req.cookies);
    ctx.res.cookie('I set this cookie', 'cooookkiiieee', {
      path: "/",
      secure: true,
      sameSite: "none",
      httpOnly: true,
    })
    const data = await prisma.user.findFirst();
    return data
  })
});


export const appRouter = router({
  auth: userRouter,
});

export type AppRouter = typeof appRouter;