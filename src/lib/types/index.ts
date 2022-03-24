export interface AuthInfo {
    isLoggedIn: boolean;
    user: User;
}

export interface User {
    name: string;
    token: string;
};

export interface Lecture {
    id: string;
    name: string;
    professor: string;
    students: string[];
};