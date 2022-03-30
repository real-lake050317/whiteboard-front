import * as api from '$lib/api/api';
import { serialize } from 'cookie';

export async function post({ request }) {
    const json = await request.json();
    const body = await api.post('auth/login', {
        user: {
            username: json.username,
            password: json.password
        }
    });
    console.log("body", body);

    if (body.error) {
        console.log("error");
        return {
            status: 404,
            body
        }
    }

    return {
        status: 201,
        headers: {
            'Set-Cookie': serialize('token', body.token, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
                maxAge: body.expiresIn
            })
        },
        body
    }



    // if(res.error) {
    //     return { status: res.status, body: res };
    // }

    // return {
    //     headers: {
    //         'set-cookie': serialize('jwt', res.body.token)
    //     }
    // }
}
