import { generateToken } from "@/src/helpers/jwt";
import { hashPassword, matchPassword } from "@/src/helpers/password";
import { z } from "zod";
import { protectedProcedure, t } from "../../trpc";


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
    const { password, ...user } = await ctx.prisma.user.findFirstOrThrow({ where: { email: input.email, }, select: { password: true, email: true, id: true } });
    const isPasswordMatch = matchPassword(input.password, password);
    if (!isPasswordMatch) ctx.res.forbidden('Password not match');
    const token = generateToken(user)
    console.log(token)
    const session = await ctx.prisma.session.create({ data: { user_id: user.id, ...token }, select: { access_token: true } });
    ctx.res.cookie('access-token', session.access_token, {
      expires: new Date(Date.now() + 9999999),
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
    })
    return session;
  }),
  test: protectedProcedure.query(({ ctx, input }) => {
    // console.log(ctx.req.session)
    return ''
  }),
  logout: t.procedure.mutation(({ ctx, input }) => {
    ctx.res.clearCookie('access-token')
    return 'Logout successfull'
  }),
})