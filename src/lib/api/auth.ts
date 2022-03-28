import type { SignupForm, PermissionType, User, LoginForm } from "$lib/types"
import { api } from "./api";
import { getLectures } from "./lectures";

let db = {
    users: [
        {
            id: 'user1',
            username: 'jungwoongkim',
            password: '1234',
            name: 'Jungwoong Kim',
            schoolID: '2022320082',
            userType: 'S',
            lectures: ['lecture1', 'lecture2', 'lecture3']
        },
        {
            id: 'user2',
            username: 'profabc',
            password: '5678',
            name: 'Professor Kim',
            schoolID: '1234567890',
            userType: 'P',
            lectures: ['lecture1', 'lecture3']
        },
        {
            id: 'user3',
            username: 'woongjungkim',
            password: '4312',
            name: 'Woongjung Kim',
            schoolID: '2022320083',
            userType: 'S',
            lectures: ['lecture3']
        },
        {
            id: 'user31',
            username: 'woongjungkim1',
            password: '43121',
            name: 'Woongjung Kim1',
            schoolID: '2022320081',
            userType: 'S',
            lectures: ['lecture1', 'lecture3']
        },
        {
            id: 'user4',
            username: 'profasdfj',
            password: '5678',
            name: 'Jaja Kim',
            schoolID: '2345',
            userType: 'P',
            lectures: ['lecture2']
        }
    ],
    lectures: [
        {
            id: 'lecture1',
            name: 'C Programming',
            professor: 'user2',
            students: ['user1', 'user31'],
        },
        {
            id: 'lecture2',
            name: 'D Programming',
            professor: 'user4',
            students: ['user1'],
            posts: [
                {
                    title: 'title1',
                    body: 'asdkfsdlkf',
                    id: 'Mar10',
                },
                {
                    title: 'title2',
                    body: 'asdkfsdlkf',
                    id: 'Mar14',
                },
                {
                    title: 'title3',
                    body: 'asdkfsdlkf',
                    id: 'Mar17',
                }

            ]
        },
        {
            id: 'lecture3',
            name: 'Python Programming',
            professor: 'user2',
            students: ['user1', 'user31', 'user2'],
        }
    ]
};

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
    const user = db.users.find(user =>
        user.username === loginForm.username &&
        user.password === loginForm.password
    );

    console.log(user);

    if (!user) {
        return {
            status: 404,
            error: 'User not Found'
        };
    }

    return {
        status: 200,
        body: {
            id: user.id,
            userType: user.userType,
        }
    };


    return await api({
        endpoint: 'auth/login',
        method: 'post',
        reqBody: loginForm
    });
}

export async function signup(signupForm: SignupForm) {
    return await api({
        endpoint: 'auth/signup',
        method: 'post',
        reqBody: signupForm
    });
}