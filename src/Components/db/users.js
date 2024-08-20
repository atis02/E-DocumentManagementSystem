import AxiosInstance from "./Redux/api/AxiosHelper";

export const Users = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await AxiosInstance.get("/user/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);

  return Users();
};
