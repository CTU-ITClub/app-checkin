import axios from "axios";

const axiosInstance = axios.create();

export const getFullUrlRequest = (url: string) => axiosInstance.get(`${url}`);
export const postFullRequest = (url: string, payload: any) => axiosInstance.post(`${url}`, payload);

const BASE_API_URL = 'https://mylife-services.herokuapp.com';

export const getRequest = (url: string) => axiosInstance.get(`${BASE_API_URL}${url}`);
export const postRequest = (url: string, payload: any) => axiosInstance.post(`${BASE_API_URL}${url}`, payload);
