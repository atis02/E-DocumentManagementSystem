import axios from "axios";

export const BASE_URL = 'https://alemhasap.alemtilsimat.com/api';

const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
});

export { AxiosInstance };  