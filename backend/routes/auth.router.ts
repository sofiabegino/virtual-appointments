import express from 'express';
import passport from 'passport';
import { IUser } from '../interfaces';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const authRouter= express.Router();

authRouter.post('/login',passport.authenticate('local',
    {session:false}),
    async(req,res,next)=>{
        try {
            const user:IUser = req.user as IUser;
            const payload = {
              id: user.id,
              role: user.role
            }
            const token = jwt.sign(payload, config.jwtSecret);
            console.log(token);
            res.json({
              user,
              token
            });
          } catch (error) {
            next(error);
          }
    }
);

export default authRouter;