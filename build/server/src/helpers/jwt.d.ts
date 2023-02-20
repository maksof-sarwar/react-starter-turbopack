import { FastifyReply, FastifyRequest } from 'fastify';
export declare const getExpireTime: (day: number) => number;
export declare function generateToken(payLoad: any, expiry?: number): {
    access_token: string;
    expired_at: number;
};
export declare function verifyToken(): (req: FastifyRequest, res: FastifyReply) => Promise<void>;
//# sourceMappingURL=jwt.d.ts.map