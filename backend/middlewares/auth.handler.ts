import boom from '@hapi/boom';
import { config } from '../config/config';
import express, { Express,ErrorRequestHandler, Request, Response,NextFunction } from 'express';

// function checkApiKey(req:Request, res:Response, next:NextFunction) {
//     const apiKey = req.headers['api'];
//     if (apiKey === config.apiKey) {
//         next();
//     } else {
//         next(boom.unauthorized());
//     }
// }

export function checkDoctorRole(req:Request, res:Response, next:NextFunction) {
    const user = req.user;
    if (req.user === 'doctor') {
        next();
    }
    else {
        next(boom.unauthorized());
    }
}

export function checkRoles(...roles:string[]) {
    return (req:Request, res:Response, next:NextFunction) => {
        const user = req.user;
        next();
        // if (roles.includes(user.role)) {
        //     next();
        // } else {
        //     next(boom.unauthorized());
        // }
    }
}

module.exports = { checkRoles }