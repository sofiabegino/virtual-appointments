"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenInfo = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }, process.env.JWT_SECRET || 'somethingsecret', {
        expiresIn: '30d',
    });
};
exports.generateToken = generateToken;
const getTokenInfo = (token) => {
    const payload = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
    return payload;
};
exports.getTokenInfo = getTokenInfo;
