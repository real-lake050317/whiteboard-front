import type { SignupForm, PermissionType, Auth, LoginForm } from "$lib/types"
import { api } from "./api";
import { getLecturesOfUser } from "./lectures";

export async function checkPermission(auth: Auth, permissions: PermissionType) {
    if (permissions.userTypes && !permissions.userTypes.includes(auth.userType)) {
        return false;
    }

    if (permissions.lectureCode) {
        return await userInLecture(auth, permissions.lectureCode);
    }

    return true;
}

export async function userInLecture(auth: Auth, lectureCode: string) {
    const res = await getLecturesOfUser(auth);

    if (res.error) {
        return false;
    }

    const lectureCodes = res.lectures.map(lecture => lecture.code);

    return lectureCodes.includes(lectureCode);
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