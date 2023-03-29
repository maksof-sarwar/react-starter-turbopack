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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const jwt_1 = require("../../src/helpers/jwt");
const password_1 = require("../../src/helpers/password");
const trpc_1 = require("../../src/trpc");
const zod_1 = require("zod");
exports.authRouter = (0, trpc_1.router)({
    register: trpc_1.publicProcedure.input(zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    })).mutation(({ ctx, input }) => {
        input.password = (0, password_1.hashPassword)(input.password);
        return ctx.prisma.user.create({ data: Object.assign({}, input) });
    }),
    login: trpc_1.publicProcedure.input(zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    })).mutation(({ ctx, input }) => __awaiter(void 0, void 0, void 0, function* () {
        const _a = yield ctx.prisma.user.findFirstOrThrow({ where: { email: input.email, }, select: { password: true, email: true, id: true } }), { password } = _a, user = __rest(_a, ["password"]);
        const isPasswordMatch = (0, password_1.matchPassword)(input.password, password);
        if (!isPasswordMatch)
            ctx.res.forbidden('Password not match');
        const token = (0, jwt_1.generateToken)(user);
        console.log(token);
        const session = yield ctx.prisma.session.create({ data: Object.assign({ user_id: user.id }, token), select: { access_token: true } });
        ctx.res.cookie('access-token', session.access_token, {
            expires: new Date(Date.now() + 9999999),
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
        });
        return session;
    })),
    test: trpc_1.protectedProcedure.query(({ ctx, input }) => {
        // console.log(ctx.req.session)
        return '';
    }),
    logout: trpc_1.publicProcedure.mutation(({ ctx, input }) => {
        ctx.res.clearCookie('access-token');
        return 'Logout successfull';
    }),
});
