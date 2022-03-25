export async function post(endpoint: string, data: any) {
    return await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());
}