export type UserType = 'P' | 'S';
export type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

export interface Auth {
    userId: string;
    token: string;
    userType: UserType;
};

export interface SignupForm {
    username: string;
    password: string;
    name: string;
    schoolId: string;
    userType: UserType;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface LectureForm {
    code: string;
    name: string;
}
export interface PostForm {
    title: string;
    body: string;
}

export interface PermissionType {
    userTypes?: UserType[];
    lectureCode?: string;
}