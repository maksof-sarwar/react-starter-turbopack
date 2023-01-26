import { z } from "zod";
import { procedure, router } from "./app";
import { prisma } from "./prisma-client";
console.log(procedure)

export const userRouter = router({
  login: procedure.input(
    z.object({
      email: z.string(),
      password: z.string()
    })
  ).mutation((req) => {
    return prisma.user.findMany();
  })
});