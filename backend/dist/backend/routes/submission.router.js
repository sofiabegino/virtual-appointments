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
const user_service_1 = require("../services/user.service");
const passport_1 = __importDefault(require("passport"));
const submissionRouter = express_1.default.Router();
const service = new services_1.SubmissionService();
const userService = new user_service_1.UserService();
submissionRouter.get('/', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const id = user.id;
    const submissions = yield service.findPatientSubmissions(id);
    res.json(submissions);
}));
submissionRouter.get('/pending', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield service.findPending();
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}));
submissionRouter.get('/task-history', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const id = user.id;
        const product = yield service.findTaskHistory(id);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}));
submissionRouter.get('/ids', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hola?');
    try {
        const submissions = yield service.findIds();
        console.log(submissions);
        res.json(submissions);
    }
    catch (error) {
        next(error);
    }
}));
submissionRouter.get('/:id', (0, middlewares_1.validatorHandler)(schemas_1.getSubmissionSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const product = yield service.findOne(id);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}));
submissionRouter.post('/', passport_1.default.authenticate('jwt', { session: false }), (0, middlewares_1.validatorHandler)(schemas_1.createSubmissionSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = req.user;
        const userId = user.id;
        const newSubmission = yield service.create(body, userId);
        res.status(201).json(newSubmission.id);
    }
    catch (error) {
        next(error);
    }
}));
submissionRouter.patch('/:id', (0, middlewares_1.validatorHandler)(schemas_1.getSubmissionSchema, 'params'), (0, middlewares_1.validatorHandler)(schemas_1.updateSubmissionSchema, 'body'), passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        console.log(JSON.stringify(req.body));
        const product = yield service.update(id, body);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}));
submissionRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rta = yield service.delete(id);
    res.json(rta);
}));
exports.default = submissionRouter;
