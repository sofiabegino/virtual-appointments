"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApi = void 0;
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./auth.router"));
const user_router_1 = __importDefault(require("./user.router"));
const upload_router_1 = __importDefault(require("./upload.router"));
const submission_router_1 = __importDefault(require("./submission.router"));
function routerApi(app) {
    const router = express_1.default.Router();
    app.use('/api', router);
    router.use('/users', user_router_1.default);
    router.use('/submissions', submission_router_1.default);
    router.use('/auth', auth_router_1.default);
    router.use('/upload', upload_router_1.default);
}
exports.routerApi = routerApi;
