import axios from "axios";

// export const BASE_URL = import.meta.env.VITE_API_KEY;
export const BASE_URL = "https://alemdocs.alemtilsimat.com/api/";

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  //   headers: {
  //     Accept: "application/json",
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   },
  //   timeout: 1000000,
});

export default AxiosInstance;
