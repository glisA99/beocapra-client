import axios, { AxiosResponse } from 'axios';
import { PrijemnicaDobavljaca } from '../types/model';

export async function createReceipt(receipt: PrijemnicaDobavljaca) {
    const URL = "api/prijemnica";
    
}