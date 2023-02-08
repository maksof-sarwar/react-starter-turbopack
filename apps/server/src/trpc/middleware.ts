import { t } from "@/trpc";
import { TRPCError } from "@trpc/server";

export const authMiddleware = () => t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});