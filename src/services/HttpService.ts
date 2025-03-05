export default class HttpService {
    static async get(url: string,headers?: RequestInit): Promise<any> {
        const response = await fetch(url,headers);
        return await response.json();
    }
}