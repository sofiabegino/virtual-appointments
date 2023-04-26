import { FC, useReducer, useEffect, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';
import { IUpdateUser } from '../../../backend/interfaces/IUser';

import { AuthContext, authReducer } from '.';

import { IUser } from '../../interfaces';
import axios, { AxiosRequestConfig } from 'axios';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export interface LoginResponse {
    user: IUser;
    token: string,
}

const api = axios.create({
    baseURL: 'http://localhost:3200/api'
  })
  

export const AuthProvider: FC<PropsWithChildren<any>> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const router = useRouter();

    useEffect(() => {
        const user = Cookies.get('user');
        if ( user ) {
            const cookie = Cookies.get('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
            dispatch({ type: '[Auth] - Login', payload: JSON.parse(user) as IUser })
        }
    }, [])

    // useEffect(() => {
    //     checkToken();
    // }, [])

    // const checkToken = async () => {


    //     const token = Cookies.get('token')
    
    //     const authenticateUserByToken = async () => {
    //       try {
    //         const { data } = await api.get('/users')
    
    //         dispatch({ type: '[Auth] - Login', payload: data })
    //       } catch (err) {}
    //     }
    
    //     if (token) {
    //       authenticateUserByToken()
    //     }
    // }

    const loginUser = async (userData:IUpdateUser): Promise<LoginResponse> => {
        // try {
            const { data } = await api.post('/auth/login', userData);
            const { token, user } = data;
            Cookies.set('token', token);
            Cookies.set('user',  JSON.stringify(user))
            dispatch({ type: '[Auth] - Login', payload: user });
            return data;
        // } catch (error) {
        //     return false;
        // }
    }

    const registerUser = async (userData:IUpdateUser): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await api.post('/users', userData);
            const { user } = data;
            dispatch({ type: '[Auth] - Login', payload: user });
            
            return {
                hasError: false
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    const updateUser = async (userData:IUpdateUser): Promise<{ hasError: boolean; message?: string }> => {

        try {
            const { data } = await api.patch(`/users/${userData.id}`,userData,{
                headers:{Authorization:`Bearer ${Cookies.get('token')}`
            }})
            Cookies.set('user', JSON.stringify(data))
            dispatch({ type: 'Update', payload: data });
            return {
                hasError: false
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'Error when updating'
            }
        }
    }

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        router.reload();
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout,
            updateUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
};