import { serialize } from 'cookie';

export function post() {
    return {
        status: 200,
        headers: {
            'Set-Cookie': serialize('token', '', {
                path: '/',
                expires: new Date(0),
            }),
        },
    };
}