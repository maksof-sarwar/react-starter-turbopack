"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const prisma_1 = require("../database/prisma");
function createContext({ req, res }) {
    const user = { token: req.cookies['access-token'] || undefined };
    return { req, res, user, prisma: prisma_1.prisma };
}
exports.createContext = createContext;
