import type { SignupForm, PermissionType, User, LoginForm } from "$lib/types"
import { api } from "./api";
import { getLectures } from "./lectures";

export async function checkPermission(user: User, permissions: PermissionType) {
    if (permissions.userTypes && !permissions.userTypes.includes(user.userType)) {
        return false;
    }

    if (permissions.lectureID) {
        const res = await getLectures(user);

        if (res.error) {
            return false;
        }

        if (!res.body.lectures.includes(permissions.lectureID)) {
            return false;
        }
    }

    return true;
}

export async function login(loginForm: LoginForm) {
    return await api({
        endpoint: 'auth/login',
        method: 'post',
        data: loginForm
    });
}

export async function signup(signupForm: SignupForm) {
    return await api({
        endpoint: 'auth/signup',
        method: 'post',
        data: signupForm
    });
}