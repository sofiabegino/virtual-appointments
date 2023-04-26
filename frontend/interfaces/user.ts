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