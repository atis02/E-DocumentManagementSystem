import axios from "axios";

 const BASE_URL = 'https://alemhasap.alemtilsimat.com/api';

 const AxiosInstance = axios.create({
    baseURL: BASE_URL,
     headers: { Accept: 'application/json' },
    // withCredentials:true,
});
const refresh = () => {
    return response = AxiosInstance.get('/auth/refresh')
}  
 
export default refresh 