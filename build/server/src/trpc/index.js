"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const auth_1 = require("../modules/auth");
const trpc_1 = require("../../trpc");
exports.appRouter = trpc_1.t.router({
    auth: auth_1.authRouter
});
