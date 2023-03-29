"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const auth_1 = require("./auth");
const trpc_1 = require("../../src/trpc");
exports.appRouter = (0, trpc_1.router)({
    auth: auth_1.authRouter
});
