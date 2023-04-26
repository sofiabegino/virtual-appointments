import { Strategy } from 'passport-local';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import {UserService} from './../../../services/user.service';
import { IShowUser } from '../../../interfaces';
import { IResponseUser } from '../../../interfaces/IUser';
const service = new UserService();

export const LocalStrategy = new Strategy({ usernameField: 'email', passwordField: 'password' },
    async (email:string, password:string, done:any) => {
        try {
            const user:IResponseUser = await service.findByEmail(email);
            if (!user) {
                done(boom.unauthorized(), false);
            }
            const isMatch = bcrypt.compare(password, user?.password);
            if (!isMatch) {
                done(boom.unauthorized(), false);
            }
            const showUser:IShowUser = user;
            delete showUser.password;
            done(null, showUser);
        }
        catch (error) {
            done(error, false);
        }
    }
);
