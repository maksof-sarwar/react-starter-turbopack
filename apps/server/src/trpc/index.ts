import { authRouter } from '../modules/auth';
import { t } from '../../trpc';
import { TRPCError } from '@trpc/server';



export const appRouter = t.router({
  auth: authRouter
})


