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
exports.createContext = exports.createContextInner = void 0;
const client_1 = require("../database/client");
const createContextInner = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    return Object.assign(Object.assign({}, opts), { prisma: client_1.prisma });
});
exports.createContextInner = createContextInner;
function createContext({ req, res }) {
    const user = { token: req.cookies['access-token'] || undefined };
    return (0, exports.createContextInner)({ user, req, res });
}
exports.createContext = createContext;
