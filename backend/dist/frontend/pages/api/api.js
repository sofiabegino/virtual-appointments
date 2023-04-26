"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const api = axios_1.default.create({
    baseURL: 'http://localhost:3200/api'
});
api.interceptors.request.use(function (config) {
    const token = js_cookie_1.default.get('token');
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Content-Type'] = 'multipart/form-data';
    return config;
});
exports.default = api;
