import axios, { AxiosResponse } from 'axios';
import { USER_DATA } from '../components/LoginForm';
import { Radnik } from '../types/model';
import { axios_instance } from './axios_instance_config';
import { getAccessToken } from './products-api';

export async function fetchRadnik(username: string):Promise<Radnik | false> {
    try {
        var access_token = getAccessToken();
        const requestConfig = {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        }
        var response:AxiosResponse<Radnik> = await axios_instance.get(`/api/radnik/${username}`,requestConfig);
        if (response.status === 200) return response.data;
        else return false;
    } catch (ex) {
        console.log(ex);
        return false;
    }
}