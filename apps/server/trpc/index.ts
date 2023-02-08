import { t } from './main';

import { z } from 'zod';

export const appRouter = t.router({
  auth: t.router({
    login: t.procedure.input(
      z.object({
        email: z.string(),
        password: z.string()
      })
    ).mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.upsert({
        create: { ...input },
        update: { ...input },
        where: { email: input.email }
      });

      // console.log(ctx.req.cookies);
      // ctx.res.cookie('I set this cookie', 'cooookkiiieee', {
      //   path: "/",
      //   domain: 'http://localhost:5173',
      //   secure: true,
      //   expires: new Date(Date.now() + 9999999),
      //   sameSite: "none",
      //   signed: false,
      //   httpOnly: true,
      // })
      // const data = await ctx.prisma.user.findFirst();
      // return data
    }),
  }),
});

export type AppRouter = typeof appRouter;