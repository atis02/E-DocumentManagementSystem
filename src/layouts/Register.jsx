import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  loginFailure,
  loginSuccess,
  registerFailure,
} from "../Components/db/Redux/reducers/AuthSlice";
import AxiosInstance from "../Components/db/Redux/api/AxiosHelper";
// import { jwtDecode } from "jwt-decode";

const Register = () => {
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [login, setLogin] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
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
        const response = await AxiosInstance.post("/user/registration", {
          login: login,
          password: password,
          surname: surname,
          firstname: name,
          email: email,
          phoneNumber: phoneNumber,
        });
        setTimeout(() => navigate("/login"), 2000),
          toast.success("Registration Succesfully !");
        setEmail("");
        setPhoneNumber("");
        setLogin("");
        setSurname("");
        setName("");
        setPassword("");
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        error.message === "Network Error"
          ? "Internet baglanyşygy ýok"
          : error.response.data.message,
        dispatch(registerFailure(error.message || "Login failed"))
      );
      setLoading(false);
    }
  };
  return (
    <Box>
      <ToastContainer />
      <Stack direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}>
        <Stack
          width="40%"
          maxHeight="100vh"
          backgroundColor="#3763f5"
          sx={{ display: { lg: "block", md: "block", sm: "none", xs: "none" } }}
        >
          <img
            src="/images/login (2).png"
            style={{
              width: "100%",
              height: "50%",
            }}
            alt=""
          />
          <Typography
            textAlign="center"
            color="#fff"
            fontWeight="400"
            fontSize={55}
            position="absolute"
            top="50%"
            right="71%"
            fontFamily="Montserrat"
          >
            ÄLEM DOCS
          </Typography>
          <img
            src="/images/login (1).png"
            style={{
              width: "100%",
              height: "50%",
            }}
            alt=""
          />
        </Stack>
        <Stack
          direction="column"
          alignItems="center"
          height="100vh"
          justifyContent="center"
          width={{ lg: "60%", md: "60%", sm: "100%", xs: "100%" }}
        >
          <Stack
            width={{ lg: "60%", md: "80%", sm: "97", xs: "97%" }}
            height={500}
            boxShadow="0px 0px 22px 3px rgba(168,168,168,1)"
            justifyContent="center"
          >
            <Typography
              mb="10px"
              color="#474747"
              fontSize="30px"
              fontFamily="Montserrat"
              fontWeight="600"
              textAlign="start"
              ml={3}
            >
              Register
            </Typography>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "40px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack direction="row" width="90%" spacing={2}>
                <TextField
                  id="outlined-basic"
                  label="Login"
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                  name="username"
                  onChange={(e) => setLogin(e.target.value)}
                  sx={{
                    borderRadius: "50px",
                    fontFamily: "Montserrat",
                    width: { lg: "70%", md: "70%", sm: "90%", xs: "90%" },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Açar söz"
                  type="text"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  autoComplete="off"
                  sx={{
                    borderRadius: "50px",
                    width: { lg: "70%", md: "70%", sm: "90%", xs: "90%" },
                    fontFamily: "Montserrat",
                  }}
                />
              </Stack>
              <Stack direction="row" width="90%" spacing={2}>
                <TextField
                  id="outlined-basic"
                  label="Adyňyz"
                  type="text"
                  name="password"
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  autoComplete="off"
                  sx={{
                    borderRadius: "50px",
                    width: { lg: "70%", md: "70%", sm: "90%", xs: "90%" },
                    fontFamily: "Montserrat",
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Familiýaňyz"
                  type="text"
                  name="password"
                  onChange={(e) => setSurname(e.target.value)}
                  variant="outlined"
                  autoComplete="off"
                  sx={{
                    borderRadius: "50px",
                    width: { lg: "70%", md: "70%", sm: "90%", xs: "90%" },
                    fontFamily: "Montserrat",
                  }}
                />
              </Stack>
              <Stack direction="row" width="90%" spacing={2}>
                <TextField
                  id="outlined-basic"
                  label="Poçtaňyz"
                  type="email"
                  name="password"
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  autoComplete="off"
                  sx={{
                    borderRadius: "50px",
                    width: { lg: "70%", md: "70%", sm: "90%", xs: "90%" },
                    fontFamily: "Montserrat",
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Telefon belgiňiz"
                  type="text"
                  name="password"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  variant="outlined"
                  autoComplete="off"
                  sx={{
                    borderRadius: "50px",
                    width: { lg: "70%", md: "70%", sm: "90%", xs: "90%" },
                    fontFamily: "Montserrat",
                  }}
                />
              </Stack>
              <Stack
                // direction="row"
                direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
                alignItems="center"
                justifyContent="flex-end"
                spacing={2}
                width="90%"
              >
                <Stack
                  // direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
                  direction="row"
                  spacing={2}
                >
                  <Link
                    to="/"
                    style={{
                      color: "#00159D",
                      fontSize: 15,
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Awtorizasiýa
                  </Link>
                </Stack>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "blue",
                    color: "#fff",
                    "&:hover": { background: "black" },
                    fontFamily: "Montserrat",
                    height: "55px",
                    width: { lg: "160px", md: "160px", sm: "100%", xs: "100%" },

                    borderRadius: "100px",
                  }}
                >
                  {loading ? (
                    <Stack alignItems="center">
                      <CircularProgress sx={{ color: "#fff" }} />
                    </Stack>
                  ) : (
                    "Hasaba alyş"
                  )}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Register;
