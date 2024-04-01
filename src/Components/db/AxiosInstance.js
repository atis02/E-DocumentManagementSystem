import axios from "axios";
import { store } from "./Redux/api/store";
// import { refreshTokenFunc } from "./Redux/reducers/refreshToken";

export const BASE_URL = 'https://alemhasap.alemtilsimat.com/api';

const AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

// AxiosInstance.interceptors.request.use(
//     async (config) => {
//         const storedAccesToken = store.getState().auth.token;
//         const expirationTime = localStorage.getItem('token')
        
//         if (storedAccesToken && (Date.now() >= expirationTime)) {
//             const newAccessToken = refreshTokenFunc();
//             config.headers.Authorization = `Bearer ${newAccessToken}`
//         }
//         return config;
//     },
//     (err) =>Promise.reject(err)
// )
export { AxiosInstance };  