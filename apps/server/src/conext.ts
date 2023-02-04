import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { Request, Response } from 'express';

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
  const user = { name: req.headers.username ?? 'anonymous' };
  return { req, res, user } as { req: Request; res: Response, user: Record<string, any> };
}
export type Context = inferAsyncReturnType<typeof createContext>;