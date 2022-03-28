import type { HTTPMethod } from "$lib/types"

interface APIParameter {
    endpoint: string;
    method: HTTPMethod;
    token?: string;
    data?: any;
}

const BACKEND_URL: string = 'https://api.whiteboard.jungwoong.kim';

export async function api({ endpoint, method, token, data }: APIParameter) {
    const fetchOptions = { method, headers: {} };

    if (data) {
        fetchOptions.headers['Content-Type'] = 'application/json';
        fetchOptions['body'] = JSON.stringify(data);
    }

    if (token) {
        fetchOptions.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const url = `${BACKEND_URL}/${endpoint}`;
        
        const res = await fetch(url, fetchOptions);

        const { status } = res;
        const body = await res.json();

        if (!res.ok) {
            return {
                status: res.status,
                error: body.message,
            };
        }

        return { status, body };
    }
    catch (error) {
        return {
            status: 500,
            error: error.message,
        };
    }
}