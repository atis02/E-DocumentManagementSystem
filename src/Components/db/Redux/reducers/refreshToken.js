import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../AxiosInstance";
import { setRefreshToken } from "./ReduxSlice";

const refreshTokenApiUrl = `${BASE_URL}/auth/refresh`;
const dispatch = useDispatch();

const token = useSelector((state) => state.auth.token);

const refreshTokenFunc = async () => {
    const refreshToken = store.getState().auth.refreshToken;

    try {
        const response = await axios.get(refreshTokenApiUrl)
            .then((res) => {
                const newToken = res.data.token;
                const newRefreshToken = res.data.refreshToken;
                dispatch(token(newToken));
                dispatch(setRefreshToken(newRefreshToken));
                console.log(res.data);
            })
    } catch (error) {
        console.log(error);
        
    }
}