"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const trpc_1 = require("../../trpc");
const server_1 = require("@trpc/server");
const authMiddleware = () => trpc_1.t.middleware(({ next, ctx }) => {
    if (!ctx.user) {
        throw new server_1.TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
exports.authMiddleware = authMiddleware;
