import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../Components/db/AxiosInstance";

const Login = () => {
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim().length <= 0 || password.trim().length <= 0) {
      toast.error("Dogry maglumatyňyzy giriziň!");
    } else {
      setLoading(true);
      const response = await AxiosInstance.post("/auth/signin", {
        email,
        password,
      })
        .then((res) => {
          if (!res.data.error) {
            setData(res.data);
            toast.success("Succesfully Signed in");
            setLoading(false);
            navigate("/");
          }
        })
        .catch((err) => toast.error(err.response.data.msg));
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Açar söz"
            type="text"
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
