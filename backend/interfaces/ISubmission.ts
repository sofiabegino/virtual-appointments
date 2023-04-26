import { IUser } from '../../frontend/interfaces/user';
interface IImage {
    type: string;
    name: string;
    data: Blob;
}

export interface ISubmission {
    id: number;
    name: string;
    title: string,
    symptoms: string,
    status: string,
    image?: IImage,
    userId?: number;
    file?:string,
    doctorId?: number;
    createdAt:string;
    user?: IUser;
    doctor?: IUser;
}

export interface IUpdateSubmission {
    id?: number;
    doctorId?: number;
    status?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
}