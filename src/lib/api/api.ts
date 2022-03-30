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

    const url = `${BACKEND_URL}/${endpoint}`;
    console.log(url, fetchOptions);

    return fetch(url, fetchOptions)
        .then(async (r) => {
            try {
                const data = await r.json();
                if (!r.ok) throw new Error(data.message);
                return data;
            }
            catch (err) {
                throw err;
            }
        })
        .catch(err => {
            return { error: err.message };
        });
}

export function post(endpoint: string, data?: any, token?: string) {
    return api({ method: 'post', endpoint, data, token });
}

export function get(endpoint: string, token?: string) {
    return api({ method: 'get', endpoint, token });
}

export function del(endpoint: string, token?: string) {
    return api({ method: 'delete', endpoint, token });
}