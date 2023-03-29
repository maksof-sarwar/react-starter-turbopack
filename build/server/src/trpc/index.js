"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedProcedure = exports.publicProcedure = exports.router = void 0;
const server_1 = require("@trpc/server");
const superjson_1 = __importDefault(require("superjson"));
const t = server_1.initTRPC.context().create({
    transformer: superjson_1.default,
    errorFormatter({ shape }) {
        return shape;
    },
});
exports.router = t.router;
exports.publicProcedure = t.procedure;
const isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
exports.protectedProcedure = t.procedure.use(isAuthed);
