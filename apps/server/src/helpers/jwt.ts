
import App from '@/src/app';
import { FastifyReply, FastifyRequest } from 'fastify';

export const getExpireTime = (day: number): number => 60 * 60 * 24 * day;

export function generateToken(payLoad, expiry = getExpireTime(1)) {
  const expiresIn = payLoad.expiresIn = expiry;
  const isObject = typeof payLoad === 'object';
  if (!payLoad) {
    const error = new TypeError('Token Payload Should Not Be Empty');
    throw error;
  }

  if (!isObject) {
    const error = new TypeError('Token Payload Must Be An Object');
    throw error;
  }

  return {
    access_token: App.instance.app.jwt.sign(payLoad, { expiresIn }),
    expired_at: expiresIn
  };
}

export function verifyToken() {
  return async (req: FastifyRequest, res: FastifyReply) => {
    try {
      await req.jwtVerify();
      const token = (
        (req.headers.authorization || req.headers.Authorization || '') as string
      )
        .split('Bearer ')
        .pop() as string;
      const { user_id } = await App.instance.prisma.session.findFirstOrThrow({
        where: { access_token: token },
      });
      req.user = user_id;
    } catch (err: any) {
      res.forbidden(err.message);
    }
  };
}