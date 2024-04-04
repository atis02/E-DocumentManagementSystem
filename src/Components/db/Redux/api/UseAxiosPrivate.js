import axios from 'axios';
import React, { useEffect } from 'react'
import useRefreshToken from './refreshToken';
import { store } from './store';
import { BASE_URL } from './AxiosInstance';

const AxiosInstance = axios.create({
    baseURL: BASE_URL,
     headers: { Accept: 'application/json' },
    withCredentials:true,
});
const UseAxiosPrivate = () => {

    const refresh = useRefreshToken();
    const setRefToken = store.getState().refreshToken;
    

    useEffect(() => {
        const requestInterceptor = AxiosInstance.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization']=`Bearer ${setRefToken}`
                }
                return config;
            },(error)=>Promise.reject(error)
        )
        const responseInterceptor = AxiosInstance.interceptors.response.use(
            response => response,
            error => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return AxiosInstance(prevRequest);
                }
            }
        );
        return () => {
            AxiosInstance.interceptors.request.eject(requestInterceptor);
            AxiosInstance.interceptors.response.eject(responseInterceptor);
        }

    }, [setRefToken])
    return AxiosInstance;
}

export default UseAxiosPrivate