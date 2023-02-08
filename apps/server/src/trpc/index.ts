import { authRouter } from '../modules/auth';
import { t } from '../../trpc';


export const appRouter = t.mergeRouters(authRouter)


