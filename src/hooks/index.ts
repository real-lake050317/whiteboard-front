import * as cookie from 'cookie';

export async function handle({ event, resolve }) {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');

    if(cookies.token) {
        const base64Payload = cookies.token.split('.')[1]; 
        const payload = Buffer.from(base64Payload, 'base64'); 
        event.locals.auth = JSON.parse(payload.toString())
        event.locals.auth.token = cookies.token;
    }

    console.log(event.locals.auth);

    return await resolve(event);
}


export function getSession({ locals }) {
    return {
        auth: locals.auth && {
            userId: locals.auth.userId,
            userType: locals.auth.userType,
            token: locals.auth.token
        }
    };
}