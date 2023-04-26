const role = {
    patient: 'patient',
    doctor: 'doctor',
}

export interface IShowUser {
    id: number;
    name: string;
    email: string;
    password?: string;
    height?: number;
    weight?: number;
    otherInfo?: string;
    phoneNumber?: string;
    role: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    height?: number;
    weight?: number;
    otherInfo?: string;
    phoneNumber?: string;
    role: string;
}

export interface IResponseUser {
    id:number;
    name: string;
    email: string;
    password: string;
    otherInfo?: string;
    phoneNumber?: string;
    height?: number;
    weight?: number;
    role: string;
}

export interface IUpdateUser {
    id?:number;
    name?: string;
    email?: string;
    password?: string;
    height?: number;
    weight?: number;
    otherInfo?: string;
    phoneNumber?: string;
    role?: string;
}