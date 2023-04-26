import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { IUser } from '../../interfaces';

export const generateToken = (user:IUser) => {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || 'somethingsecret',
      {
        expiresIn: '30d',
      }
    );
};

  export const getTokenInfo = (token:string) => {
    const payload = jwt.verify(token, config.jwtSecret);
    return payload;
  }