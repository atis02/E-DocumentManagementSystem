import axios from 'axios';
import refresh from './AxiosHelper'
import { store } from "./store"
import { useDispatch } from 'react-redux';
import { setRefreshToken } from '../reducers/ReduxSlice';
import AxiosHelper from './AxiosHelper';

const BASE_URL = 'https://alemhasap.alemtilsimat.com/api';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json' },
  // withCredentials: true,
});
const useRefreshToken = () => {
  const refreshToken = store.getState().auth.token;
  // console.log(AxiosHelper.refresh());
  
  console.log('--------')
console.log(refreshToken);
  const Refresh = async() => {
 await instance.get(`/auth/refresh`)
    .then((res) => {
      if (res.status === 200) {
        refreshToken(prev => {
          return { ...prev, ...res.data }
        });
      }
    }).catch((error) => {
      console.log(error);
    })

  }
  return Refresh()
}
export default useRefreshToken