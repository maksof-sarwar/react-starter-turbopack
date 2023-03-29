import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { prisma } from '../database/client';
type CreateContextOptions = {
  req: CreateFastifyContextOptions['req'];
  res: CreateFastifyContextOptions['res'];
  user: {
    token: string | undefined;
  };
};
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    ...opts,
    prisma,
  };
};


export function createContext({ req, res }: CreateFastifyContextOptions) {
  const user = { token: req.cookies['access-token'] || undefined };
  return createContextInner({ user, req, res });
}

export type Context = inferAsyncReturnType<typeof createContext>;