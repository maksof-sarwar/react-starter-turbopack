import { authRouter } from '@/src/modules/auth';
import { t } from '@/trpc';


export const appRouter = t.mergeRouters(authRouter)


