import { generateToken } from "@/src/helpers/jwt";
import { hashPassword, matchPassword } from "@/src/helpers/password";
import { z } from "zod";
import { t } from "../../trpc";



export const authRouter = t.router({
  register: t.procedure.input(
    z.object({
      email: z.string(),
      password: z.string(),
    })
  ).mutation(({ ctx, input }) => {
    input.password = hashPassword(input.password)
    return ctx.prisma.user.create({ data: { ...input } });
  }),
  login: t.procedure.input(
    z.object({
      email: z.string(),
      password: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    const { password, ...user } = await ctx.prisma.user.findFirstOrThrow({ where: { email: input.email } });
    const isPasswordMatch = matchPassword(password, input.password);
    if (!isPasswordMatch) ctx.res.forbidden('Password not match');
    const token = generateToken(user)
    const session = await ctx.prisma.session.create({ data: { user_id: user.id, ...token }, select: { access_token: true } });
    ctx.res.cookie('access-token', session.access_token, { sameSite: 'none', signed: false })
    return session;
  }),
})