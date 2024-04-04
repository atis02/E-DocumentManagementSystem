import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  DateCalendar,
  LocalizationProvider,
  StaticTimePicker,
  TimeClock,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { store } from "../Components/db/Redux/api/store";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const admin = JSON.parse(localStorage.getItem("token") || "[]");
  const [openCalendar, setOpenCalendar] = useState(false);

  const token = store.getState();
  console.log(token);
  console.log(admin);
  const checTime = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  const Time = () => {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    h = checTime(h);
    m = checTime(m);
    s = checTime(s);
    document.getElementById("time").innerHTML = h + ":" + m;
    document.getElementById("time").innerHTML = h + ":" + m;
    setTimeout(Time, s == 0 ? 1000 : "");
  };

  useEffect(() => {
    // const response = AxiosInstance.get("/auth/refresh").then((res) => {
    //   console.log(res.data);
    // });
    Time();
  });
  let date = new Date().toLocaleDateString("en-us", { day: "numeric" });
  let month = new Date().toLocaleDateString("en-us", { month: "2-digit" });
  let year = new Date().toLocaleDateString("en-us", { year: "numeric" });
  const FormattedDate = `${date}/${month}/${year}`;

  return (
    <Box
      height="65px"
      width="100%"
      backgroundColor="#0B57D0"
      boxShadow="0px 1px 8px #999"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TextField
        id="input-with-icon-textfield"
        placeholder="Gözleg"
        fullWidth
        sx={{
          width: { lg: "280px", md: "100%", sm: "100%", xs: "100%" },
          p: { lg: "0 0 0 30px", xs: "0 5px 0 5px" },
        }}
        InputProps={{
          endAdornment: (
            <Button
              sx={{
                minWidth: "25px",
                minHeight: "25px",
                "&:hover": {
                  backgroundColor: "#0B57D0",
                  color: "#fff",
                },
                color: "#000",
                p: "0",
                transition: "all ease 0.4s",
              }}
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="search"
                width="25px"
                height="25px"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
              </svg>
            </Button>
          ),
          sx: {
            transition: "all ease-in-out 0.2s",
            borderRadius: "35px",
            backgroundColor: "#fff",
            height: "35px",
            color: "#000",
            fontWeight: "600",
            outline: "none",
            boxShadow: "none",
          },
        }}
        variant="outlined"
      />
      <Stack
        direction="row"
        sx={{ cursor: "pointer" }}
        onClick={() => setOpenCalendar(!openCalendar)}
        alignItems="end"
        spacing={0.5}
      >
        <Typography
          color="#fff"
          fontSize={40}
          fontWeight="700"
          id="time"
        ></Typography>
        <Typography color="#fff" pb="10px">
          {FormattedDate}
        </Typography>
      </Stack>
      {openCalendar && (
        <Stack
          position="absolute"
          top={70}
          left={900}
          backgroundColor="#fff"
          zIndex={30}
          borderRadius="10px"
          border="1px solid #0B57D0"
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateCalendar"]}>
              <DemoItem>
                <Stack direction="row">
                  <Stack>
                    <TimeClock
                      minutesStep={1}
                      defaultValue={dayjs()}
                      ampm={false}
                      readOnly
                      views={["hours"]}
                    />
                    <TimeClock
                      minutesStep={1}
                      defaultValue={dayjs()}
                      ampm={false}
                      readOnly
                      views={["minutes"]}
                    />
                  </Stack>

                  <DateCalendar defaultValue={dayjs()} readOnly />
                </Stack>
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </Stack>
      )}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        pr="30px"
      >
        <Stack
          direction="row"
          color="#fff"
          fontWeight="600"
          alignItems="center"
          fontSize="18px"
        >
          <IconButton
            onClick={() => setOpen2(!open2)}
            sx={{
              transition: "all ease-in-out 0.2s",
              "&:hover": { backgroundColor: "#424242" },
            }}
          >
            <NotificationsNoneIcon sx={{ color: "lightgray" }} />
          </IconButton>
          Bildirişler
          {open2 ? (
            <Stack
              position="absolute"
              minWidth={200}
              minHeight={100}
              backgroundColor="#0B57D0"
              top={70}
              right={380}
              border="1px solid gray"
              borderRadius="10px"
              alignItems="center"
              justifyContent="center"
            >
              Bildiriş ýok
            </Stack>
          ) : (
            ""
          )}
        </Stack>
        <Stack
          direction="row"
          color="#fff"
          fontWeight="600"
          alignItems="center"
          fontSize="18px"
          pr="50px"
        >
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              color: "#5C9FE3",
              transition: "all ease-in-out 0.2s",
              "&:hover": { backgroundColor: "#424242" },
            }}
          >
            <SettingsIcon sx={{ color: "lightgray" }} />
          </IconButton>
          Sazlamalar
          {open ? (
            <Stack
              position="absolute"
              minWidth={200}
              minHeight={100}
              backgroundColor="#0B57D0"
              top={70}
              border="1px solid gray"
              borderRadius="10px"
              alignItems="center"
              justifyContent="center"
            >
              Sazlamalar ýerinde
            </Stack>
          ) : (
            ""
          )}
        </Stack>
        <Stack direction="row" alignItems="center">
          <IconButton
            sx={{
              transition: "all ease-in-out 0.2s",
              "&:hover": { backgroundColor: "#424242" },
            }}
          >
            <Avatar src="/broken-image.jpg" sx={{ background: "blue" }} />
          </IconButton>
          <Typography color="#fff" fontWeight={600}>
            {admin.user.email.toUpperCase()}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
