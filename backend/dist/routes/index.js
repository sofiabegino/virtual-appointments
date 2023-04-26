"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApi = void 0;
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./auth.router"));
const user_router_1 = __importDefault(require("./user.router"));
function routerApi(app) {
    const router = express_1.default.Router();
    app.use('/api', router);
    router.use('/users', user_router_1.default);
    router.use('/auth', auth_router_1.default);
}
exports.routerApi = routerApi;
