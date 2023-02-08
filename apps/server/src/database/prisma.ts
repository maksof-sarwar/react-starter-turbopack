import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient({
  errorFormat: 'pretty',
  // log: ['error', 'info', 'warn', 'query']
});

async function excludePasswordMiddleware(params, next) {
  const result = await next(params);
  delete result?.user?.password;
  delete result?.user?.OTP;
  if (result?.length) result.forEach((r) => {
    delete r?.user?.password;
    delete r?.user?.OTP;
  });
  if (params?.model === 'User' && !params?.args?.select?.password) {
    delete result?.password;
    delete result?.OTP;
    if (result?.length) result.forEach((r) => {
      console.log(r);
      delete r?.password;
      delete r?.OTP;
    });
  }
  return result;
}

prisma.$use(excludePasswordMiddleware);