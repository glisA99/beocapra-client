import axios, { AxiosResponse } from 'axios';
import { Dobavljac } from '../types/model';
import { axios_instance } from './axios_instance_config';
import { getAccessToken } from './products-api';

export async function fetchDobavljaci():Promise<Array<Dobavljac> | false> {
    try {
        var access_token = getAccessToken();
        const requestConfig = {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        }
        var response:AxiosResponse<Array<Dobavljac>> = await axios_instance.get(`/api/dobavljaci`,requestConfig);
        if (response.status === 200) return response.data;
        else return false;
    } catch (ex) {
        console.log(ex);
        return false;
    }
}