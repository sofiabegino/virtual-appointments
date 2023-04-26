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
exports.UserService = void 0;
const faker_1 = require("@faker-js/faker");
const boom_1 = __importDefault(require("@hapi/boom"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../db/models");
class UserService {
    constructor() {
        this.users = [];
        this.generate();
        // UserMap(sequelize);
    }
    generate() {
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            return {
                _id: faker_1.faker.datatype.uuid(),
                name: faker_1.faker.name.firstName(),
                email: faker_1.faker.internet.email(),
                password: faker_1.faker.internet.password(10, true, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
                role: 'patient',
            };
        }
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                _id: faker_1.faker.datatype.uuid(),
                name: user.name,
                email: user.email,
                password: bcryptjs_1.default.hashSync(user.password, 8),
                role: user.role
            };
            models_1.User.create(newUser);
            return newUser;
        });
    }
    // return {
    //   ...newUser,
    //   token: generateToken(newUser),
    // };
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = models_1.User.findAll();
            if (!users) {
                throw boom_1.default.notFound('there are no users');
            }
            return users;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({ where: { email: email } });
            if (!user) {
                throw boom_1.default.notFound('user not found');
            }
            const foundUser = {
                _id: user.id,
                email: user.email,
                role: user.role,
                name: user.name,
                password: user.password,
            };
            return foundUser;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findByPk(id);
            if (!user) {
                throw boom_1.default.notFound('user not found');
            }
            return user;
        });
    }
    update(id, modifiedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findByPk(id);
            if (user === null) {
                throw boom_1.default.notFound('user not found');
            }
            user.set(Object.assign(Object.assign({}, user), modifiedUser));
            yield user.save();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findByPk(id);
            if (user === null) {
                throw boom_1.default.notFound('user not found');
            }
            yield user.destroy();
            return { id };
        });
    }
}
exports.UserService = UserService;
