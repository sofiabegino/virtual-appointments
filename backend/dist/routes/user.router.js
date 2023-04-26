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
const express_1 = __importDefault(require("express"));
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const userRouter = express_1.default.Router();
const service = new services_1.UserService();
userRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield service.find();
    res.json(products);
}));
userRouter.get('/:id', (0, middlewares_1.validatorHandler)(schemas_1.getUserSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield service.findOne(id);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}));
userRouter.post('/', (0, middlewares_1.validatorHandler)(schemas_1.createUserSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newUser = yield service.create(body);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
}));
userRouter.patch('/:id', (0, middlewares_1.validatorHandler)(schemas_1.getUserSchema, 'params'), (0, middlewares_1.validatorHandler)(schemas_1.updateUserSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = yield service.update(id, body);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}));
userRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rta = yield service.delete(id);
    res.json(rta);
}));
exports.default = userRouter;
