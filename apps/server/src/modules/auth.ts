import { z } from "zod";
import { t } from "../../trpc";



export const authRouter = t.router({
  login: t.procedure.input(
    z.object({
      email: z.string(),
      password: z.string(),
      test: z.string()
    })
  ).mutation(async ({ ctx, }) => {
    ctx.res.redirect(200, 'http://www.google.com')
  }),

})