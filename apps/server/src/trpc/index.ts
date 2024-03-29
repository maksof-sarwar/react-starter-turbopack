import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { TRPCPanelMeta } from "trpc-panel";
import { type Context } from "./context";

const t = initTRPC
  .meta<TRPCPanelMeta>()
  .context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
      return shape;
    },
  });

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);


