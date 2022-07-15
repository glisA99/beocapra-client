import axios, { AxiosResponse } from 'axios';
import { PrijemnicaDobavljaca } from '../types/model';
import { axios_instance } from './axios_instance_config';
import { getAccessToken } from './products-api';

export const CREATED_STATUS_CODE = 201;

export async function createReceiptAsync(receipt: PrijemnicaDobavljaca) {
    const URL = "api/prijemnica";
    var access_token = getAccessToken();
    const requestConfig = {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    }
    try {
        var result = await axios_instance.post(URL,{
            ...receipt
        },requestConfig)
        if (result.status === CREATED_STATUS_CODE) return true;
        else return false;
    } catch (ex) {
        console.log(ex);
        return false;
    }
}