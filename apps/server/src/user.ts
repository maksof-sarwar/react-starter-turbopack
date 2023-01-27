import { z } from "zod";
import { protectedProcedure, router } from "./app";
import { prisma } from "./prisma-client";
console.log(router)
export const userRouter = () => {
  return router({
    login: protectedProcedure.input(
      z.object({
        email: z.string(),
        password: z.string(),
        test: z.string()
      })
    ).mutation(async ({ ctx, }) => {
      console.log(ctx.req.cookies);
      ctx.res.cookie('I set this cookie', 'cooookkiiieee', {
        path: "/",
        domain: 'http://localhost:5173',
        secure: true,
        expires: new Date(Date.now() + 9999999),
        sameSite: "none",
        signed: false,
        httpOnly: true,
      })
      const data = await prisma.user.findFirst();
      return data
    }),
    login1: protectedProcedure.input(
      z.object({
        email: z.string(),
        password: z.string(),
        test: z.string()
      })
    ).mutation(async ({ ctx, }) => {
      console.log(ctx.req.cookies);
      ctx.res.cookie('I set this cookie', 'cooookkiiieee', {
        path: "/",
        domain: 'http://localhost:5173',
        secure: true,
        expires: new Date(Date.now() + 9999999),
        sameSite: "none",
        signed: false,
        httpOnly: true,
      })
      const data = await prisma.user.findFirst();
      return data
    })
  });
}