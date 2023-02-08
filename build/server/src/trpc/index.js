"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const auth_1 = require("../../src/modules/auth");
const trpc_1 = require("../../trpc");
exports.appRouter = trpc_1.t.mergeRouters(auth_1.authRouter);
