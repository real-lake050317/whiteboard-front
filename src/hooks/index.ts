import * as cookie from 'cookie';

export async function handle({ event, resolve }) {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');

    event.locals.token = cookies.token && Buffer.from(cookies.token, 'base64').toString('utf-8');

    return await resolve(event);
}


export function getSession({ locals }) {
    return {
        user: locals.user && {
            username: locals.user.username,
            userType: locals.user.userType,
        }
    };
}