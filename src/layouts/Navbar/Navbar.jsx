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
  Backdrop,
  useMediaQuery,
  useTheme,
  Drawer,
  Badge,
} from "@mui/material";
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
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../Components/db/Redux/api/store";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ToastContainer, toast } from "react-toastify";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  MenuItem,
  Menu,
  Sidebar,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TelegramIcon from "@mui/icons-material/Telegram";
import EmailIcon from "@mui/icons-material/Email";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HomeIcon from "@mui/icons-material/Home";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Diversity3Icon from "@mui/icons-material/Diversity3";

import axios from "axios";
// import { logout } from "../../Components/db/Redux/reducers/ReduxSlice";
import menuItems from "./components/menuItems";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const admin = JSON.parse(localStorage.getItem("user"));
  const [openCalendar, setOpenCalendar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const opening = Boolean(anchorEl);
  const [selectedTime, setSelectedTime] = useState(dayjs());

  // Handle time changes
  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    Time();
  });
  let date = new Date().toLocaleDateString("en-us", { day: "2-digit" });
  let month = new Date().toLocaleDateString("en-us", { month: "2-digit" });
  let year = new Date().toLocaleDateString("en-us", { year: "numeric" });
  const FormattedDate = `${date}/${month}/${year}`;
  const navigate = useNavigate();
  // const Logout = async () => {
  //   const response = await axios
  //     .post("https://alemhasap.alemtilsimat.com/api/auth/signout")
  //     .then(
  //       (res) => console.log(res),
  //       localStorage.removeItem("token"),

  //       dispatch(logout()),
  //       setTimeout(() => navigate("/login"), 1000),
  //       toast.success("Succesfully Logout!")
  //     );
  // };
  const dispatch = useDispatch();

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
        onClick={() => setOpenCalendar(true)}
        alignItems="end"
        spacing={0.5}
        sx={{
          display: {
            lg: "flex",
            md: "flex",
            sm: "none",
            xs: "none",
          },
          cursor: "pointer",
        }}
      >
        <Typography
          color="#fff"
          fontSize={40}
          pl={16}
          fontWeight="700"
          id="time"
        ></Typography>
        <Typography color="#fff" pb="10px">
          {FormattedDate}
        </Typography>
      </Stack>
      <Backdrop
        sx={{
          backgroundColor: "transparent",
          color: "#000",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openCalendar}
        onClick={() => setOpenCalendar(false)}
      >
        <Stack
          position="absolute"
          top={70}
          left="30%"
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
                      value={selectedTime} // Controlled value
                      onChange={handleTimeChange}
                      minutesStep={1}
                      defaultValue={dayjs()}
                      ampm={false}
                      readOnly
                      views={["hours"]}
                      sx={{
                        display: {
                          lg: "flex",
                          md: "flex",
                          sm: "none",
                          xs: "none",
                        },
                      }}
                    />
                    <TimeClock
                      minutesStep={1}
                      value={selectedTime} // Controlled value
                      onChange={handleTimeChange}
                      ampm={false}
                      readOnly
                      views={["minutes"]}
                      sx={{
                        display: {
                          lg: "flex",
                          md: "none",
                          sm: "none",
                          xs: "none",
                        },
                      }}
                    />
                  </Stack>

                  <DateCalendar
                    value={selectedTime} // Controlled value
                    onChange={handleTimeChange}
                    defaultValue={dayjs()}
                    readOnly
                  />
                </Stack>
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </Stack>
      </Backdrop>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        pr={{ lg: "30px", md: "30px", sm: "30px", xs: "10px" }}
      >
        <Stack
          direction="row"
          sx={{ display: { lg: "flex", md: "flex", sm: "flex", xs: "none" } }}
          alignItems="center"
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
          <Typography
            fontFamily="Montserrat"
            color="#fff"
            fontWeight="600"
            sx={{ display: { lg: "flex", md: "none", sm: "none", xs: "none" } }}
            fontSize="18px"
          >
            Sazlamalar
          </Typography>
          <Backdrop
            sx={{
              backgroundColor: "transparent",
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
            onClick={() => setOpen(false)}
          >
            <Stack
              position="absolute"
              minWidth={200}
              minHeight={100}
              backgroundColor="#0B57D0"
              top={65}
              right={150}
              border="1px solid gray"
              borderRadius="10px"
              alignItems="center"
              justifyContent="center"
            >
              Sazlamalar ýerinde
            </Stack>
          </Backdrop>
        </Stack>

        <Link
          to="/account"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            textDecoration: "none",
          }}
        >
          <IconButton
            sx={{
              transition: "all ease-in-out 0.2s",
              "&:hover": { backgroundColor: "#424242" },
            }}
          >
            <Avatar
              alt={admin.firstname}
              src={
                admin.img === null
                  ? admin.firstname[0]
                  : `https://alemdocs.alemtilsimat.com/api/static/profil/${admin.img}`
              }
              sx={{ background: "blue" }}
            />
          </IconButton>
          <Typography
            color="#fff"
            fontFamily="Montserrat"
            sx={{ display: { lg: "flex", md: "flex", sm: "flex", xs: "none" } }}
            fontWeight={600}
          >
            {admin.firstname[0].toUpperCase()}.{admin.surname.toUpperCase()}
          </Typography>
        </Link>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ ...(isMobile ? { display: "flex" } : { display: "none" }) }}
        >
          <IconButton
            onClick={toggleMobileMenu}
            sx={{
              width: 24,
              height: 24,
              p: 0,
            }}
          >
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Stack>
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={toggleMobileMenu}
          sx={{
            "& .MuiDrawer-paper": {
              width: "60%",
              backgroundColor: "transparent",
              backdropFilter: "blur(5px)",
            },
          }}
        >
          <Box
            className="mobile-menu"
            sx={{
              bg: "#000",
              height: "100%",
              padding: "16px 0",
            }}
          >
            <Stack
              spacing={2}
              direction="column"
              height="35px"
              alignItems="center"
            >
              <Button onClick={toggleMobileMenu}>
                <svg
                  fillRule="evenodd"
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="close"
                  width="2em"
                  height="2em"
                  fill="#fff"
                  aria-hidden="true"
                >
                  <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                </svg>
              </Button>
              <Stack direction="column" alignItems="center" spacing={2}>
                <Stack>
                  <Stack
                    sx={{ ...(open ? "" : { flexDirection: "column" }) }}
                    height="54px"
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    m="0px 30px"
                  >
                    <Link style={{ textDecoration: "none" }} to="/">
                      <ToastContainer />
                      <Typography
                        color="#F3F3F4"
                        fontWeight="700"
                        sx={{
                          ...(open
                            ? { fontSize: "30px" }
                            : { fontSize: "18px" }),
                        }}
                        textAlign="center"
                        fontFamily="Montserrat"
                      >
                        Älem Doc
                      </Typography>
                    </Link>
                  </Stack>
                  <Menu
                    menuItemStyles={{
                      button: {
                        "&:hover": { backgroundColor: "#1976d2" },
                      },
                    }}
                  >
                    {menuItems.map((elem) => (
                      <MenuItem
                        key={elem}
                        component={
                          <NavLink className="sideNavMobile" to={elem.link} />
                        }
                        icon={elem.icon}
                      >
                        {elem.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </Stack>
                <Stack>
                  <Button
                    sx={{
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                      fontSize: "12px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    <HelpOutlineIcon sx={{ width: 30, height: 30 }} />
                    Kömek
                  </Button>
                  <Button
                    // onClick={Logout}
                    sx={{
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      fontFamily: "Montserrat",
                      fontSize: "11px",
                    }}
                  >
                    <PowerSettingsNewIcon sx={{ width: 30, height: 30 }} />
                    Çykmak
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Drawer>
      </Stack>
    </Box>
  );
}
