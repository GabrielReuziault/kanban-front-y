export default class HttpService {
    static async get(url: string, headers?: RequestInit): Promise<any> {
        const response = await fetch(url, headers);
        return await response.json();
    }

    static async post(url: string, data: any, headers?: RequestInit): Promise<any> {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(headers?.headers || {})
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    }

    static async delete(url: string, headers?: RequestInit): Promise<any> {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(headers?.headers || {})
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        return await response.json();
    }
}