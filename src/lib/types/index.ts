export type UserType = 'P' | 'S';
export type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

export interface User {
    id: string;
    token: string;
    userType: UserType;
};

export interface SignupForm {
    username: string;
    password: string;
    name: string;
    schoolID: string;
    userType: UserType;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface PermissionType {
    userTypes?: UserType[];
    lectureID?: string;
}