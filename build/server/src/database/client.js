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
exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient({
    errorFormat: 'pretty',
    // log: ['error', 'info', 'warn', 'query']
});
function excludePasswordMiddleware(params, next) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield next(params);
        (_a = result === null || result === void 0 ? void 0 : result.user) === null || _a === void 0 ? true : delete _a.password;
        (_b = result === null || result === void 0 ? void 0 : result.user) === null || _b === void 0 ? true : delete _b.OTP;
        if (result === null || result === void 0 ? void 0 : result.length)
            result.forEach((r) => {
                var _a, _b;
                (_a = r === null || r === void 0 ? void 0 : r.user) === null || _a === void 0 ? true : delete _a.password;
                (_b = r === null || r === void 0 ? void 0 : r.user) === null || _b === void 0 ? true : delete _b.OTP;
            });
        if ((params === null || params === void 0 ? void 0 : params.model) === 'User' && !((_d = (_c = params === null || params === void 0 ? void 0 : params.args) === null || _c === void 0 ? void 0 : _c.select) === null || _d === void 0 ? void 0 : _d.password)) {
            result === null || result === void 0 ? true : delete result.password;
            result === null || result === void 0 ? true : delete result.OTP;
            if (result === null || result === void 0 ? void 0 : result.length)
                result.forEach((r) => {
                    console.log(r);
                    r === null || r === void 0 ? true : delete r.password;
                    r === null || r === void 0 ? true : delete r.OTP;
                });
        }
        return result;
    });
}
exports.prisma.$use(excludePasswordMiddleware);
