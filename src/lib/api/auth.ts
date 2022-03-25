import { session } from "$app/stores";
import type { SignupForm, PermissionType, User, LoginForm } from "$lib/types"
import { api } from "./api";
import { getLectures } from "./lectures";

// check auth
// export function checkAuth() {
//     if (!browser) return;

//     let auth: User;

//     const unsubscribe = authStore.subscribe(_auth => auth = _auth);

//     authStore.update(_auth => {
//         if (!_auth) {
//             // try to get user from localStorage
//             _auth = getLocalAuth();
//             // _auth = {
//             //     id: 'someone_id',
//             //     token: 'jwt'
//             // };
//         }

//         return _auth;
//     });

//     unsubscribe();

//     // if not logged in and requesting internal content
//     return auth;
// }

export async function checkPermission(user: User, permissions: PermissionType) {
    if (permissions.userTypes && !permissions.userTypes.includes(user.userType)) {
        return { 
            vaild: false 
        };
    }

    if (permissions.lectureID) {
        const res = await getLectures(user);

        if (res.error) {
            return {
                valid: false,
                error: res.error
            };
        }

        return { 
            valid: res.body.lectures.includes(permissions.lectureID) 
        };
    }

    return { 
        valid: true 
    };
}

export async function login(loginForm: LoginForm) {
    return await api({
        endpoint: '/auth/login',
        method: 'post',
        reqBody: loginForm
    });
}

export async function signup(signupForm: SignupForm) {
    return await api({
        endpoint: '/auth/signup',
        method: 'post',
        reqBody: signupForm
    });
}

export function logout() {
    session.update((_) => null);
}