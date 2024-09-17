import {
  Box,
  Button,
  CircularProgress,
  IconButton,
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
} from "../Components/db/Redux/reducers/AuthSlice";
import AxiosInstance from "../Components/db/Redux/api/AxiosHelper";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
        const response = await AxiosInstance.post("/user/login", {
          login: email,
          password: password,
        });
        const { token, user } = response.data;
        dispatch(loginSuccess({ token, user }));
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => navigate("/"), 0), toast.success("Üstünlikli giriş");
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        error.message === "Network Error"
          ? "Internet baglanyşygy ýok"
          : error.response.data.message,
        dispatch(loginFailure(error.message || "Login failed"))
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
          <Stack
            left="30px"
            top="30px"
            position="absolute"
            width={250}
            direction="row"
            alignItems="center"
          >
            <img
              src="/images/Logo.png"
              style={{
                width: "85px",
                height: "95px",
              }}
              alt=""
            />
            <Typography
              textAlign="center"
              color="#fff"
              fontWeight="500"
              fontSize={20}
              ml={-3}
              fontFamily="Montserrat"
            >
              ÄLEM TILSIMAT
            </Typography>
          </Stack>
          <img
            src="/images/login (2).png"
            style={{
              width: "100%",
              height: "49.4vh",
            }}
            alt=""
          />
          <Typography
            textAlign="center"
            color="#fff"
            fontWeight="500"
            fontSize={55}
            position="absolute"
            top="45%"
            left="3%"
            fontFamily="Montserrat"
          >
            ÄLEM DOCS
          </Typography>

          <img
            src="/images/login (1).png"
            style={{
              width: "100%",
              height: "49.5vh",
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
            boxShadow="0px 0px 12px 3px rgba(168,168,168,1)"
            justifyContent="center"
            borderRadius="20px"
          >
            <Typography
              mt={-3}
              mb={4}
              color="#474747"
              fontSize="30px"
              fontFamily="Montserrat"
              fontWeight="600"
              textAlign="center"
              // ml={3}
            >
              Giriş
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
              <TextField
                id="outlined-basic"
                label="Login"
                type="text"
                variant="outlined"
                autoComplete="off"
                name="username"
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  borderRadius: "50px",
                  fontFamily: "Montserrat",
                  width: { lg: "80%", md: "70%", sm: "90%", xs: "90%" },
                }}
              />
              <TextField
                name="password"
                label="Açar söz"
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  sx: {
                    color: "#757575", // Set the label color
                  },
                }}
                sx={{
                  width: { lg: "80%", md: "70%", sm: "90%", xs: "90%" },
                  transition: "all ease-in-out 0.2s",

                  backgroundColor: "#fff",
                  height: "60px",
                  color: "#000",
                  outline: "none",
                  boxShadow: "none",
                }}
              />

              <Stack
                // direction="row"
                direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
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
                    Paroly dikeltmek
                  </Link>
                  <Link
                    to="/register"
                    style={{
                      color: "#00159D",
                      fontSize: 15,
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Registrasiýa
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
                    "Girmek"
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

export default Login;
