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
exports.SubmissionService = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const models_1 = require("../db/models");
const sequelize_1 = __importDefault(require("./../libs/sequelize"));
const sequelize_2 = require("sequelize");
class SubmissionService {
    constructor() {
        (0, models_1.SubmissionSchema)(sequelize_1.default);
        models_1.Submission.associate();
    }
    create(submission, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSubmission = {
                title: submission.title,
                symptoms: submission.symptoms,
                status: 'Pending',
                userId: userId,
            };
            const createdSubmission = models_1.Submission.create(newSubmission);
            return createdSubmission;
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            // sendMail();
            const submissions = yield models_1.Submission.findAll({ include: [{ model: models_1.User, as: "user" },
                    { model: models_1.User, as: "doctor" }] });
            return submissions;
        });
    }
    findPending() {
        return __awaiter(this, void 0, void 0, function* () {
            const submissions = yield models_1.Submission.findAll({
                where: {
                    status: 'Pending'
                },
                include: [{ model: models_1.User, as: "user" }],
            });
            return submissions;
        });
    }
    findTaskHistory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const submissions = yield models_1.Submission.findAll({
                where: {
                    [sequelize_2.Op.not]: [{ status: 'Pending' }],
                    doctorId: id
                },
                include: [{ model: models_1.User, as: "user" },
                    { model: models_1.User, as: "doctor", attributes: ['name'] }]
            });
            return submissions;
        });
    }
    findIds() {
        return __awaiter(this, void 0, void 0, function* () {
            const submissions = (yield models_1.Submission.findAll({ attributes: ['id'], raw: true }));
            if (!submissions) {
                throw boom_1.default.notFound('there are no submissions');
            }
            return submissions;
        });
    }
    findPatientSubmissions(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const submissions = (yield models_1.Submission.findAll({ where: { userId: id },
                include: [{ model: models_1.User, as: "user" },
                    { model: models_1.User, as: "doctor" }] }));
            if (!submissions) {
                throw boom_1.default.notFound('there are no submissions');
            }
            return submissions;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const submission = yield models_1.Submission.findByPk(id, { include: [{ model: models_1.User, as: "user", attributes: {
                            exclude: ['password']
                        } },
                    { model: models_1.User, as: "doctor", attributes: ['name'] }] });
            if (!submission) {
                throw boom_1.default.notFound('submission not found');
            }
            return submission;
        });
    }
    update(id, modifiedSubmission) {
        return __awaiter(this, void 0, void 0, function* () {
            const submission = yield models_1.Submission.findByPk(id);
            if (submission === null) {
                throw boom_1.default.notFound('submission not found');
            }
            submission.set(Object.assign(Object.assign({}, submission), modifiedSubmission));
            yield submission.save();
            return submission;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const submission = yield models_1.Submission.findByPk(id);
            if (submission === null) {
                throw boom_1.default.notFound('user not found');
            }
            yield submission.destroy();
            return { id };
        });
    }
}
exports.SubmissionService = SubmissionService;
