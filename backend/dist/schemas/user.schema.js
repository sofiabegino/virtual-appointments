"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const yup = __importStar(require("yup"));
const id = yup.string().uuid();
const name = yup.string().min(3);
const email = yup.string().email();
const password = yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'The password must have at least: 8 characters, 1 uppercase, 1 lowercase, 1 number y 1 special character.');
const confirm_password = yup.string();
const role = yup.mixed().oneOf(['doctor', 'patient']);
const weight = yup.number();
const height = yup.number();
const phoneNumber = yup.string();
exports.createUserSchema = yup.object({
    name: name.required('El nombre es requerido'),
    email: email.required('Email es requerido'),
    password: password.required('Contraseña es requerida'),
    confirm_password: confirm_password.required('Por favor, confirma tu contraseña')
        .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
    role: role.required(),
});
exports.updateUserSchema = yup.object({
    name: name,
    email: email,
    password: password,
    weight: weight,
    height: height,
    phoneNumber: phoneNumber,
    confirm_password: confirm_password.oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
    role: role,
});
exports.getUserSchema = yup.object({
    id: id.required(),
});
