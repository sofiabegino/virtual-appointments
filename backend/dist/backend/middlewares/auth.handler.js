"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoles = exports.checkDoctorRole = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
// function checkApiKey(req:Request, res:Response, next:NextFunction) {
//     const apiKey = req.headers['api'];
//     if (apiKey === config.apiKey) {
//         next();
//     } else {
//         next(boom.unauthorized());
//     }
// }
function checkDoctorRole(req, res, next) {
    const user = req.user;
    if (req.user === 'doctor') {
        next();
    }
    else {
        next(boom_1.default.unauthorized());
    }
}
exports.checkDoctorRole = checkDoctorRole;
function checkRoles(...roles) {
    return (req, res, next) => {
        const user = req.user;
        next();
        // if (roles.includes(user.role)) {
        //     next();
        // } else {
        //     next(boom.unauthorized());
        // }
    };
}
exports.checkRoles = checkRoles;
module.exports = { checkRoles };
