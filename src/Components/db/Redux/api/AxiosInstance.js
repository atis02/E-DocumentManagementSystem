import axios from "axios";
import { store } from "./store";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/ReduxSlice";

export const BASE_URL = 'https://alemhasap.alemtilsimat.com/api';

const token = localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null
// console.log(token.token);
export const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { Accept: 'application/json' },
    // withCredentials:true,
});

// AxiosInstance.interceptors.request.use(async config => {
//     if (token!==null) {
//         config.headers.Authorization = `Bearer ${token.token}`
//     }

    
//     return config;
// }, error => Promise.reject(error)
// );

// AxiosInstance.interceptors.response.use(response => response, async (error) => {
//     const expectedErr = error.response && error.response.status >= 400
//     if (!expectedErr) {
//         console.log('Expexted Error',error)
//     } else if (error.response.status === 401) {
//         const refreshToken = store.getState().refreshToken;

//         if (refreshToken) {
//             try {
//                 const user = jwtDecode(token.token)
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
//     if (!isExpired) {
//         return config;
//     }
//     const response = await axios.get('https://alemhasap.alemtilsimat.com/api/auth/refresh')
//     console.log(response);
//     localStorage.setItem('token', JSON.stringify(response.data))
//     config.headers.Authorization = `Bearer ${response.data.token}`
//                 return AxiosInstance(error.config)
//             } catch (refreshError) {
//                 console.error('Refresh token error:', refreshError);
//               }
//         } else {
//             useDispatch(logout())
//         }
//     }
// })
// export const axiosPrivate = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         headers: {
//             'Content-Type':'application/json'
//         },
//     },
// })

