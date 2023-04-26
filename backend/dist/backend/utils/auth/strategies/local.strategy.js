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
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const boom_1 = __importDefault(require("@hapi/boom"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("./../../../services/user.service");
const service = new user_service_1.UserService();
exports.LocalStrategy = new passport_local_1.Strategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield service.findByEmail(email);
        if (!user) {
            done(boom_1.default.unauthorized(), false);
        }
        const isMatch = bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isMatch) {
            done(boom_1.default.unauthorized(), false);
        }
        const showUser = user;
        delete showUser.password;
        done(null, showUser);
    }
    catch (error) {
        done(error, false);
    }
}));
