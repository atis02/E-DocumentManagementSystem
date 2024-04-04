import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Components/db/Redux/reducers/ReduxSlice";
import {
  AxiosInstance,
  BASE_URL,
} from "../Components/db/Redux/api/AxiosInstance";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email.trim().length <= 0 || password.trim().length <= 0) {
        toast.error("Dogry maglumatyňyzy giriziň!");
      } else {
        setLoading(true);
        const response = await AxiosInstance.post(`${BASE_URL}/auth/signin`, {
          email,
          password,
        });
        console.log(response);
        const user = response.data.user.email;
        const token = response.data.token;

        dispatch(loginSuccess({ user, token }));
        if (response.status === 200) {
          localStorage.setItem("token", JSON.stringify(response.data));
          toast.success("Successfully logged in!");
          setTimeout(() => navigate("/"), 1000);
        }
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <Box>
      <ToastContainer />
      <Stack
        direction="column"
        alignItems="center"
        height="100vh"
        justifyContent="center"
      >
        <Typography width="500px" mb="10px" fontSize="30px" textAlign="start">
          Login
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "500px",
            gap: "10px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Email ýada Adyňyz"
            type="text"
            variant="outlined"
            name="username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Açar söz"
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            sx={{
              backgroundColor: "blue",
              color: "#fff",
              "&:hover": { background: "black" },
              height: "55px",
            }}
          >
            {loading ? (
              <Stack alignItems="center">
                <CircularProgress sx={{ color: "#fff" }} />
              </Stack>
            ) : (
              "Girmek"
            )}
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default Login;
