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
exports.getUser = exports.getUsersId = exports.updateUser = exports.loginUser = exports.createUser = void 0;
const api_1 = __importDefault(require("./api"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('lpm' + user);
    const response = yield api_1.default.post(`/users`, user);
    console.log(response);
    return response;
});
exports.createUser = createUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        email,
        password
    };
    const response = yield (yield api_1.default.post(`/users`, user)).data;
    return response;
});
exports.loginUser = loginUser;
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('entre');
    const response = yield api_1.default.patch(`/users/${user.id}`, user);
    console.log(response);
    return response;
});
exports.updateUser = updateUser;
const getUsersId = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hola');
    const response = yield (yield api_1.default.get('/users/ids')).data;
    response.forEach((id) => {
        id.id.toString();
    });
    console.log(response);
    return response;
});
exports.getUsersId = getUsersId;
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (yield api_1.default.get(`/`)).data;
    return response;
});
exports.getUser = getUser;
