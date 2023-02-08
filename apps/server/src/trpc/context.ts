import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
export function createContext({ req, res }: CreateFastifyContextOptions) {
  const user = { name: req.headers.username ?? 'anonymous' };
  return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;