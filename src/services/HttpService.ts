export default class HttpService {
    static async get(url: string,headers?: RequestInit): Promise<any> {
        const response = await fetch(url,headers);
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

}