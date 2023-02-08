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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.getExpireTime = void 0;
const app_1 = __importDefault(require("../../src/app"));
const getExpireTime = (day) => 60 * 60 * 24 * day;
exports.getExpireTime = getExpireTime;
function generateToken(payLoad, expiry) {
    const expiresIn = payLoad.expiresIn = expiry;
    const isObject = typeof payLoad === 'object';
    if (!payLoad) {
        const error = new TypeError('Token Payload Should Not Be Empty');
        throw error;
    }
    if (!isObject) {
        const error = new TypeError('Token Payload Must Be An Object');
        throw error;
    }
    return app_1.default.instance.app.jwt.sign(payLoad, { expiresIn });
}
exports.generateToken = generateToken;
function verifyToken() {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield req.jwtVerify();
            const token = (req.headers.authorization || req.headers.Authorization || '')
                .split('Bearer ')
                .pop();
            const { user_id } = yield app_1.default.instance.prisma.session.findFirstOrThrow({
                where: { access_token: token },
            });
            req.user = user_id;
        }
        catch (err) {
            res.forbidden(err.message);
        }
    });
}
exports.verifyToken = verifyToken;
