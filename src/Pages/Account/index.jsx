import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import QRCodeComponent from "./components/QRCodeComponent";
import { Users } from "../../Components/db/users";
import { useDispatch, useSelector } from "react-redux";
import {
  getImg,
  updateImg,
} from "../../Components/db/Redux/api/ImageUpdateSlice";
import AxiosInstance from "../../Components/db/Redux/api/AxiosHelper";
import axios from "axios";

export default function Account() {
  // const admin = JSON.parse(localStorage.getItem("token") || "[]");

  const admin = JSON.parse(localStorage.getItem("user"));

  const [email, setEmail] = useState(admin.firstname);
  const [lastName, setLastName] = useState(admin.surname);
  const [phoneNumber, setPhoneNumber] = useState(
    admin.phoneNumber == null ? "+993 66778899" : admin.phoneNumber
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const data = useSelector((state) => state.imgAccount.data);
  const status = useSelector((state) => state.imgAccount.status);
  const error = useSelector((state) => state.imgAccount.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const userImg = async () =>
      await axios
        .get(
          `https://alemdocs.alemtilsimat.com/api/static/profil/${
            file !== null ? file.name : admin.img
          }`
        )
        .then((res) => {
          setImg(res.config.url);
        });
    userImg();
  }, []);
  const handleUpdateImg = () => {
    const body = new FormData();
    body.append("file", file);
    body.append("id", admin.id);
    dispatch(updateImg(body));
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const currentPassword = "AlemTilsimat50";
  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="#f2f9fc"
      overflow="scroll"
    >
      <Stack>
        <Typography p="5px 20px" fontSize="30px" fontWeight="600">
          Profil
        </Typography>
        <Stack
          backgroundColor="#fff"
          direction="column"
          spacing={4}
          minHeight="80vh"
          borderRadius="20px"
          m="0px 20px 10px 20px"
          boxShadow=" 0px 0px 15px -2px rgba(0,0,0,0.75)"
        >
          <Stack alignItems="center">
            <IconButton
              sx={{ "&:hover .file-input-label2": { display: "block" } }}
            >
              <Stack position="relative" display="inline-block">
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="file"
                  className="file-input2"
                />
                <label htmlFor="file" className="file-input-label2"></label>
              </Stack>
              <Avatar
                alt={admin.firstname}
                src={
                  data === null
                    ? admin.firstname[0]
                    : `https://alemdocs.alemtilsimat.com/api/static/profil/${admin.img}`
                }
                sx={{ width: 150, height: 150, background: "gray" }}
              />
            </IconButton>
            {file !== null ? file.name : ""}
            {file !== null ? (
              <Button
                onClick={handleUpdateImg}
                variant="outlined"
                color="success"
              >
                Üýtgetmek
              </Button>
            ) : (
              ""
            )}
            <Typography fontSize={30} mb={2} fontWeight={600}>
              {admin.firstName}
            </Typography>
          </Stack>
          <Stack
            direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
            justifyContent="space-evenly"
          >
            <Stack alignItems="center">
              <Typography fontSize={24} mb={5} fontWeight={600}>
                Ulanyjy barada
              </Typography>

              <form
                // onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: "20px",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    fontSize={20}
                    width={300}
                    fontWeight={700}
                    textAlign="start"
                  >
                    Ulanyjy Ady:
                  </Typography>
                  <TextField
                    fullWidth
                    value={email.toUpperCase()}
                    label="Adyňyz"
                    type="text"
                    name="password"
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      sx: {
                        transition: "all ease-in-out 0.2s",
                        borderRadius: "35px",
                        backgroundColor: "#fff",
                        height: "35px",
                        color: "#000",
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    fontSize={20}
                    width={300}
                    fontWeight={700}
                    textAlign="start"
                  >
                    Ulanyjy Familiýasy:
                  </Typography>
                  <TextField
                    fullWidth
                    value={lastName.toUpperCase()}
                    label="Familiýaňyz"
                    type="text"
                    name="password"
                    onChange={(e) => setLastName(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      sx: {
                        transition: "all ease-in-out 0.2s",
                        borderRadius: "35px",
                        backgroundColor: "#fff",
                        height: "35px",
                        color: "#000",
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    textAlign="start"
                    fontSize={20}
                    width={300}
                    fontWeight={700}
                  >
                    Ulanyjy Telefony:
                  </Typography>
                  <TextField
                    fullWidth
                    value={phoneNumber}
                    label="Telefon Belgi"
                    type="text"
                    variant="outlined"
                    name="username"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    InputProps={{
                      sx: {
                        transition: "all ease-in-out 0.2s",
                        borderRadius: "35px",
                        backgroundColor: "#fff",
                        height: "35px",
                        color: "#000",
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  />
                </Stack>
                <Stack alignItems="end">
                  <Button
                    type="submit"
                    disabled={
                      admin.firstName === email && admin.surname === lastName
                      // admin.user.phoneNumber === phoneNumber
                    }
                    sx={{
                      "&:disabled": { background: "lightgray" },
                      background: "blue",
                      color: "#fff",
                      "&:hover": { background: "black" },
                      height: "45px",
                      width: "200px",
                    }}
                  >
                    {loading ? (
                      <Stack alignItems="center">
                        <CircularProgress sx={{ color: "#fff" }} />
                      </Stack>
                    ) : (
                      "Üýtgetmek"
                    )}
                  </Button>
                </Stack>
              </form>
            </Stack>
            <Stack alignItems="center">
              <Typography fontSize={24} mb={2.8} fontWeight={600}>
                Açar sözi üýtgetmek
              </Typography>
              <form
                // onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",

                  gap: "20px",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    textAlign="start"
                    fontSize={20}
                    width={300}
                    fontWeight={700}
                  >
                    Häzirki Açar sözüňiz:
                  </Typography>
                  <OutlinedInput
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
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
                    }
                    sx={{
                      transition: "all ease-in-out 0.2s",
                      borderRadius: "35px",
                      backgroundColor: "#fff",
                      height: "35px",
                      color: "#000",
                      outline: "none",
                      boxShadow: "none",
                    }}
                  />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    fontSize={20}
                    width={300}
                    fontWeight={700}
                    textAlign="start"
                  >
                    Täze açar söz:
                  </Typography>
                  <OutlinedInput
                    fullWidth
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={password !== currentPassword}
                    placeholder="Täze açar söz"
                    type={showNewPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{
                      transition: "all ease-in-out 0.2s",
                      borderRadius: "35px",
                      backgroundColor: "#fff",
                      height: "35px",
                      color: "#000",
                      outline: "none",
                      boxShadow: "none",
                    }}
                  />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    textAlign="start"
                    fontSize={20}
                    width={300}
                    fontWeight={700}
                  >
                    Täze açar söz:
                  </Typography>
                  <OutlinedInput
                    onChange={(e) => setNewPasswordAgain(e.target.value)}
                    fullWidth
                    placeholder="Täze açar söz"
                    disabled={password !== currentPassword}
                    type={showNewPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{
                      transition: "all ease-in-out 0.2s",
                      borderRadius: "35px",
                      backgroundColor: "#fff",
                      height: "35px",
                      color: "#000",
                      outline: "none",
                      boxShadow: "none",
                    }}
                  />
                </Stack>
                <Stack alignItems="end">
                  <Button
                    type="submit"
                    disabled={
                      password !== currentPassword ||
                      newPassword === "" ||
                      newPasswordAgain === "" ||
                      newPassword !== newPasswordAgain
                    }
                    sx={{
                      "&:disabled": { background: "lightgray" },
                      background: "blue",
                      color: "#fff",
                      "&:hover": { background: "black" },
                      height: "45px",
                      width: "200px",
                    }}
                  >
                    {loading ? (
                      <Stack alignItems="center">
                        <CircularProgress sx={{ color: "#fff" }} />
                      </Stack>
                    ) : (
                      "Üýtgetmek"
                    )}
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Stack>
        </Stack>
        {/* <Stack>
          <Typography fontSize="24px" mt="30px" color="gray" fontWeight="600">
            Ulanyjy Goşmak
          </Typography>
          <Divider />

          <form
            style={{
              marginTop: "20px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              width="60%"
              alignItems="center"
              justifyContent="space-between"
              spacing={4}
              m="15px"
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Ady"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Familiýasy"
                variant="outlined"
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              width="60%"
              spacing={4}
              m="15px"
            >
              <Autocomplete
                fullWidth
                multiple={true}
                disableClearable
                id="combo-box-demo"
                options={users.map((elem) => elem.fullName)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    name="profession"
                    id="outlined-basic"
                    autoComplete="off"
                    label="Wezipe  "
                    variant="outlined"
                  />
                )}
              />
              <Autocomplete
                fullWidth
                multiple={true}
                disableClearable
                id="combo-box-demo"
                options={users.map((elem) => elem.fullName)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    name="profession"
                    id="outlined-basic"
                    autoComplete="off"
                    label="Bölüm  "
                    variant="outlined"
                  />
                )}
              />
            </Stack>
            <Button
              type="submit"
              sx={{
                backgroundColor: "blue",
                color: "#fff",
                "&:hover": { background: "black" },
                minHeight: "55px",
                minWidth: "128px",
                m: "15px",
              }}
            >
              goşmak
            </Button>
          </form>
        </Stack> */}
      </Stack>
    </Box>
  );
}
