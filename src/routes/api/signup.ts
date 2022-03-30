import * as api from '$lib/api/api';

export async function post({ request }) {
    const json = await request.json();
    const body = await api.post('auth/signup', { user: json });

    console.log('jaja');
    
    if (body.error) {
        console.log("error");
        return {
            status: 401,
            body
        }
    }
    console.log(body);

    return {
        redirect: '/auth/login',
        status: 301,
    };



    // if(res.error) {
    //     return { status: res.status, body: res };
    // }

    // return {
    //     headers: {
    //         'set-cookie': serialize('jwt', res.body.token)
    //     }
    // }
}
