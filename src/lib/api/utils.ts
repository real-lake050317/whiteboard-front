export function post(endpoint: string, data?: any) {
    console.log("Util post", endpoint);
    return fetch(endpoint, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());
}