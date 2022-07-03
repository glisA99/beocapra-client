import axios, { AxiosResponse } from 'axios';

const PORT = 8080;
const BASE_URL = `http://localhost:${PORT}`;
const axios_instance = axios.create({
    baseURL: BASE_URL,
    timeout: 2500
})

export type Tokens = {
    access_token: string,
    refresh_token: string
}

export async function login(username: string,password: string):Promise<Tokens | false>{
    try {
        const response: AxiosResponse<Tokens> = await axios_instance.post("/login",undefined,{
            params: {
                username,
                password
            }
        });
        console.log(response);
        if (response.status === 200) return response.data;
        return false;
    } catch (ex) {
        console.log("EX:", ex);
        return false;
    }
}