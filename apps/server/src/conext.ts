import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { Request, Response } from 'express';

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  const user = { name: req.headers.username ?? 'anonymous' };
  return { req, res, user } as { req: Request; res: Response, user: Record<string, any> };
}
export type Context = inferAsyncReturnType<typeof createContext>;