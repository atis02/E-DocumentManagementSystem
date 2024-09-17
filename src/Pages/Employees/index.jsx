import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Components/db/Redux/api/AxiosHelper";
import { getUsers } from "../../Components/db/Redux/api/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { registerFailure } from "../../Components/db/Redux/reducers/AuthSlice";
import { toast, ToastContainer } from "react-toastify";

const index = () => {
  const [titleSearch, setTitleSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+993");
  const [login, setLogin] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const data = useSelector((state) => state.users.data);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const admin = JSON.parse(localStorage.getItem("user"));

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
        toast.success("Üstünlikli!");
        setEmail("");
        setPhoneNumber("");
        setLogin("");
        setSurname("");
        setName("");
        setPassword("");
        setLoading(false);
        handleClose();
        dispatch(getUsers());
      }
    } catch (error) {
      toast.error(
        error.message === "Network Error"
          ? "Internet baglanyşygy ýok"
          : error.response.data.error,

        dispatch(registerFailure(error.message || "Login failed"))
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers =
    status === "succeeded"
      ? data.filter((item) =>
          item.firstname.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    minHeight: "60%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    border: "1px solid green",
    boxShadow: 44,
    gap: "10px",
    p: 4,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };
  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="#f2f9fc"
      overflow="scroll"
    >
      <Typography
        p="10px 20px"
        fontSize={{ lg: "30px", md: "30px", sm: "25px", xs: "20px" }}
        fontFamily="Montserrat"
        fontWeight="600"
      >
        Işgärler
      </Typography>
      <Stack
        backgroundColor="#fff"
        spacing={4}
        minHeight="80vh"
        borderRadius="20px"
        m="0px 20px "
        pb="10px"
        boxShadow=" 0px 0px 15px -5px rgba(0,0,0,0.75)"
      >
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Stack
            direction={{ lg: "row", md: "row", sm: "row", xs: "row" }}
            alignItems="center"
            justifyContent="center"
            ml={{ xs: 2 }}
            p="15px"
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              autoComplete="off"
              sx={{ color: "#000", minWidth: "150px", mr: "20px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              placeholder="Ady boýunça gözle"
              InputProps={{
                sx: {
                  height: "45px",
                  color: "#000",
                  fontWeight: "600",

                  padding: "none",
                },
              }}
            />
            <Button variant="outlined">Gözle</Button>
          </Stack>
          <Stack
            alignItems="center"
            justifyContent="center"
            ml={{ xs: 2 }}
            p="15px"
            sx={{
              ...(admin.role === "ADMIN"
                ? { display: "flex" }
                : { display: "none" }),
            }}
          >
            <Button
              sx={{
                color: "#fff",
                background: "rgb(7, 172, 7)",
                "&:hover": { background: "green" },
              }}
              variant="outlined"
              onClick={handleOpen}
            >
              Ulanyjy Goşmak
            </Button>
            <ToastContainer />

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Stack alignItems="end" width="100%" mt={-2}>
                  <IconButton
                    sx={{ fontWeight: 600, fontSize: 20 }}
                    onClick={handleClose}
                  >
                    X
                  </IconButton>
                </Stack>
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  width={"100%"}
                >
                  <Stack
                    width="90%"
                    height={450}
                    borderRadius="20px"
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
                      Ulanyjy Goş
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
                            width: {
                              lg: "70%",
                              md: "70%",
                              sm: "90%",
                              xs: "90%",
                            },
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
                            width: {
                              lg: "70%",
                              md: "70%",
                              sm: "90%",
                              xs: "90%",
                            },
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
                            width: {
                              lg: "70%",
                              md: "70%",
                              sm: "90%",
                              xs: "90%",
                            },
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
                            width: {
                              lg: "70%",
                              md: "70%",
                              sm: "90%",
                              xs: "90%",
                            },
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
                            width: {
                              lg: "70%",
                              md: "70%",
                              sm: "90%",
                              xs: "90%",
                            },
                            fontFamily: "Montserrat",
                          }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Telefon belgiňiz"
                          type="text"
                          name="password"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          variant="outlined"
                          autoComplete="off"
                          sx={{
                            borderRadius: "50px",
                            width: {
                              lg: "70%",
                              md: "70%",
                              sm: "90%",
                              xs: "90%",
                            },
                            fontFamily: "Montserrat",
                          }}
                        />
                      </Stack>
                      <Stack
                        // direction="row"
                        direction={{
                          lg: "row",
                          md: "row",
                          sm: "row",
                          xs: "column",
                        }}
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={2}
                        width="90%"
                      >
                        <Button
                          type="submit"
                          sx={{
                            backgroundColor: "blue",
                            color: "#fff",
                            "&:hover": { background: "black" },
                            fontFamily: "Montserrat",
                            height: "55px",
                            width: {
                              lg: "160px",
                              md: "160px",
                              sm: "100%",
                              xs: "100%",
                            },

                            borderRadius: "100px",
                          }}
                        >
                          {loading ? (
                            <Stack alignItems="center">
                              <CircularProgress sx={{ color: "#fff" }} />
                            </Stack>
                          ) : (
                            "Ulanyjy Goş"
                          )}
                        </Button>
                      </Stack>
                    </form>
                  </Stack>
                </Stack>
              </Box>
            </Modal>
          </Stack>
        </Stack>
        <Stack>
          {status === "loading..." ? (
            <Stack
              direction="column"
              height="100%"
              alignItems="center"
              sx={{ gap: "10px", mt: "20px" }}
            >
              <CircularProgress />
              Loading...
            </Stack>
          ) : status === "failed" ? (
            toast.error(error)
          ) : status === "succeeded" ? (
            <Stack>
              {filteredUsers.length == 0 ? (
                <Typography textAlign="center" fontSize={20}>
                  Ulanyjy tapylmady!
                </Typography>
              ) : (
                filteredUsers.map((item, index) => (
                  <Stack
                    key={item.id}
                    color="#000"
                    direction="row"
                    spacing={2}
                    p="5px 20px"
                    className="document"
                    borderBottom="1px solid gray"
                    borderTop={index == 0 ? "1px solid gray" : ""}
                    justifyContent="space-between"
                  >
                    <Typography>{index + 1}.</Typography>
                    <Typography>{item.firstname}</Typography>
                    <Typography>{item.surname}</Typography>
                    <Typography>{item.phoneNumber}</Typography>
                    <Typography>{item.email}</Typography>
                  </Stack>
                ))
              )}
            </Stack>
          ) : (
            ""
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default index;
