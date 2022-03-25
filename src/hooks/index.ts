import type { User } from "$lib/types"
import { authStore } from "$lib/stores";
import type { MaybePromise, RequestEvent, ResolveOptions } from "@sveltejs/kit/types/internal";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }: {
    event: RequestEvent;
    resolve(
        event: RequestEvent,
        opts?: ResolveOptions
    ): MaybePromise<Response>;
}) {
    let auth: User;

    const unsubscribe = authStore.subscribe(_auth => auth = _auth);

    authStore.update(_auth => {
        if (!_auth) {
            // try to get user from localStorage
            // _auth = {
            //     id: 'someone_id',
            //     token: 'jwt'
            // };
        }

        return _auth;
    });

    unsubscribe();

    // if no logged in and requesting internal content
    // redirect to login page
    if (!auth && !event.url.pathname.startsWith('/auth')) {
        console.log(`accessing with no auth. need login.`);

        const url = new URL('/auth/login', event.url.origin);

        return Response.redirect(url);
    }

    console.log('yes auth or /auth');
    return await resolve(event);
}
