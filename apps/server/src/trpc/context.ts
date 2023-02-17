import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
export function createContext({ req, res }: CreateFastifyContextOptions) {
  const user = { token: req.cookies['access-token'] || undefined };
  return { req, res, user, prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;