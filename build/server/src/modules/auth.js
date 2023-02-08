"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../../src/database/prisma");
const trpc_1 = require("../../trpc");
exports.authRouter = trpc_1.t.router({
    login: trpc_1.t.procedure.input(zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
        test: zod_1.z.string()
    })).mutation(({ ctx, }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(ctx.req.cookies);
        ctx.res.cookie('I set this cookie', 'cooookkiiieee', {
            path: "/",
            domain: 'http://localhost:5173',
            secure: true,
            expires: new Date(Date.now() + 9999999),
            sameSite: "none",
            signed: false,
            httpOnly: true,
        });
        const data = yield prisma_1.prisma.user.findFirst();
        return data;
    })),
});
