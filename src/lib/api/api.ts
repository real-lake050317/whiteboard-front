import type { HTTPMethod, User } from "$lib/types"

interface APIParameter {
    endpoint: string;
    method: HTTPMethod;
    user?: User;
    reqBody?: any;
}

export async function api({ endpoint, method, user, reqBody }: APIParameter) {
    try {
        const url = `https://${import.meta.env.BACKEND_URL}/${endpoint}`;
        const res = await fetch(url, {
            method,
            headers: {
                ...user ? { Authorization: `Bearer ${user.token}` } : {},
                'Content-Type': 'application/json'
            },
            ...reqBody ? { reqBody: JSON.stringify(reqBody) } : {},
        });

        const { status } = res;
        const resBody = await res.json();

        return { status, body: resBody };
    }
    catch (error) {
        return {
            status: 500,
            error: error,
        };
    }
}