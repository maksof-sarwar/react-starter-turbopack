"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedProcedure = exports.t = void 0;
const server_1 = require("@trpc/server");
exports.t = server_1.initTRPC.context().create();
const isAuthed = exports.t.middleware(({ next, ctx }) => {
    if (!ctx.user.token) {
        throw new server_1.TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to access this resource",
        });
    }
    return next();
});
exports.protectedProcedure = exports.t.procedure.use(isAuthed);
