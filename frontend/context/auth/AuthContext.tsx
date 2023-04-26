import { createContext } from 'react';
import { IUser } from '../../interfaces';
import { IUpdateUser } from '../../../backend/interfaces/IUser';
import { LoginResponse } from './AuthProvider';

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;
    loginUser: (user:IUpdateUser) => Promise<LoginResponse>;
    registerUser: (user:IUpdateUser) => Promise<{ hasError: boolean; message?: string; }>;
    updateUser:(user:IUpdateUser) => Promise<{ hasError: boolean; message?: string; }>;
    logout: () => void;
}


export const AuthContext = createContext({} as ContextProps );