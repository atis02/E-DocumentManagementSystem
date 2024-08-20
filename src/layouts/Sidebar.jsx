import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Zoom,
  styled,
  tooltipClasses,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TelegramIcon from "@mui/icons-material/Telegram";
import HomeIcon from "@mui/icons-material/Home";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  MenuItem,
  Menu,
  Sidebar,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { dbDoc } from "../Components/db/dbDocuments.mjs";
import axios from "axios";
// import { logout } from "../Components/db/Redux/reducers/ReduxSlice";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../Components/db/Redux/reducers/AuthSlice";
import { getDocument } from "../Components/db/Redux/api/UserGetDocumentSlice";
import { userSendedDocuments } from "../Components/db/Redux/api/UserSendedDocumentSlice";
import AxiosInstance from "../Components/db/Redux/api/AxiosHelper";

export default function SidebarNav(data, sendingData) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const stateDocs = useSelector((state) => state.sendedDocs);
  const DeletedDocs = JSON.parse(localStorage.getItem("deletedDocs")) || [];
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
    setTimeout(() => navigate("/login"), 1000),
      toast.success("Succesfully Logout!");
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // useEffect(() => {
  //   const userID = JSON.parse(localStorage.getItem("user"));
  //   console.log(userID.id);
  //   const getLength = async () => {
  //     const response = await AxiosInstance.get(`docs/send/${userID.id}`).then(
  //       (result) => {
  //         setGetLength(result.data);
  //       }
  //     );
  //   };
  //   getLength();
  // }, []);

  return (
    <>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#0B57D0",
            color: "#F3F3F4",
            maxHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
        className="sidebar"
        style={{
          minHeight: "100vh",
          ...(open
            ? {
                minWidth: "250px",

                width: { ...(isMobile ? "150px" : "250px") },
              }
            : {
                width: "80px",
                minWidth: "80px",
              }),
          ...(isMobile ? { display: "none" } : { display: "flex" }),
          border: "none",
        }}
      >
        <Stack>
          <Stack
            sx={{ ...(open ? "" : { flexDirection: "column" }) }}
            height="54px"
            direction="row"
            alignItems="center"
            justifyContent="center"
            m="20px 30px"
          >
            <Link style={{ textDecoration: "none" }} to="/">
              <ToastContainer />
              <Typography
                color="#F3F3F4"
                fontWeight="700"
                sx={{ ...(open ? { fontSize: "30px" } : { fontSize: "18px" }) }}
                textAlign="center"
                fontFamily="Montserrat"
              >
                Alem Docs
              </Typography>
            </Link>
            <IconButton
              sx={{
                color: "#F3F3F4",
                ...(open
                  ? ""
                  : {
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#5C9FE3",
                    }),
              }}
              onClick={handleOpen}
            >
              {" "}
              <MenuOpenIcon />
            </IconButton>
          </Stack>
          <Menu
            menuItemStyles={{
              button: {
                "&:hover": { backgroundColor: "#1976d2" },
              },
            }}
          >
            <MenuItem
              component={<NavLink className="sideNav" to="/" />}
              icon={
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Baş sahypa"
                  arrow
                  placement="right"
                >
                  <HomeIcon />
                </Tooltip>
              }
            >
              {open ? "Baş sahypa" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/dashboard" />}
              icon={
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Dolandyryş Paneli"
                  arrow
                  placement="right"
                >
                  <DashboardIcon />
                </Tooltip>
              }
            >
              {open ? "Dolandyryş" : ""}
            </MenuItem>
            {open ? (
              <>
                <SubMenu
                  title="Submenu"
                  label="Resminamalar"
                  className="sideNav"
                  icon={
                    <Badge
                      badgeContent={data.data.length + data.sendingData.length}
                      color="primary"
                    >
                      <EmailIcon />
                    </Badge>
                  }
                >
                  <MenuItem
                    icon={
                      <Badge badgeContent={data.data.length} color="primary">
                        <ArchiveIcon />
                      </Badge>
                    }
                    component={
                      <NavLink className="sideNav2" to="/document/inbox" />
                    }
                  >
                    Gelen
                  </MenuItem>
                  <MenuItem
                    icon={
                      <Badge
                        badgeContent={data.sendingData.length}
                        color="primary"
                      >
                        <UnarchiveIcon />
                      </Badge>
                    }
                    component={
                      <NavLink className="sideNav2" to="/document/out" />
                    }
                  >
                    Giden
                  </MenuItem>
                  <MenuItem
                    component={
                      <NavLink className="sideNav2" to="/document/archive" />
                    }
                    icon={
                      <Badge badgeContent={0} color="primary">
                        <AutoStoriesIcon />
                      </Badge>
                    }
                  >
                    Arhiw
                  </MenuItem>
                  <MenuItem
                    component={
                      <NavLink className="sideNav2" to="/document/new" />
                    }
                    icon={<NoteAddIcon />}
                  >
                    Täze Resminama
                  </MenuItem>
                </SubMenu>
              </>
            ) : (
              <>
                <MenuItem
                  component={
                    <NavLink className="sideNav" to="/document/inbox" />
                  }
                  icon={
                    <Badge badgeContent={data.data.length} color="primary">
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Gelen Resminamalar"
                        arrow
                        placement="right"
                      >
                        <ArchiveIcon />
                      </Tooltip>
                    </Badge>
                  }
                ></MenuItem>
                <MenuItem
                  component={<NavLink className="sideNav" to="/document/out" />}
                  icon={
                    <Badge
                      badgeContent={data.sendingData.length}
                      color="primary"
                    >
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Ugradylan Resminamalar"
                        arrow
                        placement="right"
                      >
                        <UnarchiveIcon />
                      </Tooltip>
                    </Badge>
                  }
                ></MenuItem>
                <MenuItem
                  component={
                    <NavLink className="sideNav" to="/document/archive" />
                  }
                  icon={
                    <Badge badgeContent={0} color="primary">
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Arhiw"
                        arrow
                        placement="right"
                      >
                        <AutoStoriesIcon />
                      </Tooltip>
                    </Badge>
                  }
                ></MenuItem>
                <MenuItem
                  component={<NavLink className="sideNav" to="/document/new" />}
                  icon={
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Täze Resminama"
                      arrow
                      placement="right"
                    >
                      <NoteAddIcon />
                    </Tooltip>
                  }
                ></MenuItem>
              </>
            )}

            <MenuItem
              component={<NavLink className="sideNav" to="/chat" />}
              icon={
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Söhbetdeşlik"
                  arrow
                  placement="right"
                >
                  <TelegramIcon />
                </Tooltip>
              }
            >
              {open ? "Söhbetdeşlik" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/account" />}
              icon={
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Profil"
                  arrow
                  placement="right"
                >
                  <AccountCircleIcon />
                </Tooltip>
              }
            >
              {open ? "Profil" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/orders" />}
              icon={
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Buýruklar"
                  arrow
                  placement="right"
                >
                  <BorderColorIcon />
                </Tooltip>
              }
            >
              {open ? "Buýruklar" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/employees" />}
              icon={
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Işgärler"
                  arrow
                  placement="right"
                >
                  <Diversity3Icon />
                </Tooltip>
              }
            >
              {open ? "Işgärler" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/notifications" />}
              icon={
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Bildirişler"
                  arrow
                  placement="right"
                >
                  <NotificationsIcon />
                </Tooltip>
              }
            >
              {open ? "Bildirişler" : ""}
            </MenuItem>
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
            onClick={handleLogout}
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
      </Sidebar>
    </>
  );
}
