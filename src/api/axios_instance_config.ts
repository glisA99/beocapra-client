import axios from 'axios';

export const PORT = 8080;
export const BASE_URL = `http://localhost:${PORT}`;
export const axios_instance = axios.create({
    baseURL: BASE_URL,
    timeout: 2500
})