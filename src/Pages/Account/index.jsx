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
import React, { useState } from "react";
import { users } from "../../Components/db/dbUsers.mjs";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Account() {
  const admin = JSON.parse(localStorage.getItem("token") || "[]");
  const [email, setEmail] = useState(admin.user.firstName);
  const [lastName, setLastName] = useState(admin.user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(
    admin.user.phoneNumber == null ? "+993 66778899" : admin.user.phoneNumber
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  console.log(password);
  const [loading, setLoading] = useState(false);
  console.log(users);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const currentPassword = "AlemTilsimat50";
  return (
    <Box height="100vh" width="100%" overflow="scroll">
      <Stack>
        <Typography p="10px 20px" fontSize="30px" fontWeight="600">
          Profil
        </Typography>
        <Stack direction="column" spacing={4} m="0px 0 50px 40px">
          <Stack alignItems="center">
            <IconButton>
              <Avatar
                alt="Remy Sharp"
                // src={profilePhoto}
                sx={{ width: 150, height: 150, background: "gray" }}
              />
            </IconButton>
            <Typography fontSize={30} mb={5} fontWeight={600}>
              {admin.user.fullName}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-evenly">
            <Stack alignItems="center">
              <Typography fontSize={24} mb={5} fontWeight={600}>
                Ulanyjy barada
              </Typography>
              <form
                // onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 600,
                  gap: "10px",
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
                    Ulanyjy ady:
                  </Typography>
                  <TextField
                    fullWidth
                    value={email.toUpperCase()}
                    label="Adyňyz"
                    type="text"
                    variant="outlined"
                    name="username"
                    onChange={(e) => setEmail(e.target.value)}
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
                  />
                </Stack>
                <Stack alignItems="end">
                  <Button
                    type="submit"
                    disabled={
                      admin.user.firstName === email &&
                      admin.user.lastName === lastName
                      // admin.user.phoneNumber === phoneNumber
                    }
                    sx={{
                      "&:disabled": { background: "lightgray" },
                      background: "blue",
                      color: "#fff",
                      "&:hover": { background: "black" },
                      height: "55px",
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
              <Typography fontSize={24} mb={5} fontWeight={600}>
                Açar sözi üýtgetmek
              </Typography>
              <form
                // onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 600,
                  gap: "10px",
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
                      height: "55px",
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
        <Typography fontSize="24px" mt="30px" color="gray" fontWeight="600">
          Ähli Ulanyjylar
        </Typography>
        <Divider />
      </Stack>
    </Box>
  );
}
