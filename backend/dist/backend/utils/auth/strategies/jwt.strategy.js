"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("../../../config/config");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.config.jwtSecret
};
exports.JwtStrategy = new passport_jwt_1.Strategy(options, (payload, done) => {
    return done(null, payload);
});
