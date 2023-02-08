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
const prisma_1 = require("./database/prisma");
const plugins_1 = __importDefault(require("../src/plugins"));
const fastify_1 = __importDefault(require("fastify"));
class App {
    constructor() {
        this.prisma = prisma_1.prisma;
        this.PORT = Number(process.env.PORT || 3000);
        App.instance = this;
        this._app = (0, plugins_1.default)((0, fastify_1.default)({ maxParamLength: 5000 }));
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._app.setNotFoundHandler((req, rep) => {
                    if (req.url.startsWith("/api")) {
                        rep.notFound(`Route ${req.method}:${req.url} not found`);
                    }
                    else
                        rep.status(200).sendFile("index.html");
                });
                yield this._app.ready();
                this._app.log.debug(`\nRoutes:\n${this._app.printRoutes()}`);
                yield this._app.listen({ port: this.PORT, host: '0.0.0.0' });
                console.log(`\x1b[44m\x1b[1m\x1b[4m[server] is running on port : ${this.PORT}\x1b[0m`);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    get app() {
        if (!this._app)
            throw new Error(`App not initialized`);
        return this._app;
    }
}
exports.default = App;
