import { AxiosResponse } from 'axios';
import { axios_instance } from './axios_instance_config';

export type Tokens = {
    access_token: string,
    refresh_token: string
}
export type UserData = {
    tokens: Tokens,
    username: string
}

export async function login(username: string,password: string):Promise<UserData | false>{
    try {
        const response: AxiosResponse<Tokens> = await axios_instance.post("/login",undefined,{
            params: {
                username,
                password
            }
        });
        console.log("login response:")
        console.log(response);
        console.log(parseJwt(response.data.access_token))
        if (response.status === 200) return { 
            tokens: response.data,
            username
        }
        return false;
    } catch (ex) {
        console.log("EX:", ex);
        return false;
    }
}

export function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};