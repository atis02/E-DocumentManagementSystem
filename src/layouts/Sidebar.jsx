import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  MenuItem,
  Menu,
  Sidebar,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch, useSelector } from "react-redux";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { dbDoc } from "../Components/db/dbDocuments.mjs";
import axios from "axios";
import { logout } from "../Components/db/Redux/reducers/ReduxSlice";
import { ToastContainer, toast } from "react-toastify";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function SidebarNav() {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };
  const stateDocs = useSelector((state) => state.sendedDocs);
  const DeletedDocs = JSON.parse(localStorage.getItem("deletedDocs")) || [];
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.user);

  const Logout = async () => {
    const response = await axios
      .post("https://alemhasap.alemtilsimat.com/api/auth/signout")
      .then(
        (res) => console.log(res),
        localStorage.removeItem("token"),

        dispatch(logout()),
        setTimeout(() => navigate("/login"), 1000),
        toast.success("Succesfully Logout!")
      );
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#0B57D0",
            color: "#F3F3F4",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
        style={{
          minHeight: "100vh",
          ...(open
            ? { minWidth: "250px", width: "250px" }
            : { width: "80px", minWidth: "0px" }),
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
            m="30px 30px"
          >
            <Link style={{ textDecoration: "none" }} to="/">
              <ToastContainer />
              <Typography
                color="#F3F3F4"
                fontWeight="700"
                sx={{ ...(open ? { fontSize: "30px" } : { fontSize: "18px" }) }}
                textAlign="center"
              >
                EDM system
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
              icon={<DashboardIcon />}
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
                    <Badge badgeContent={1} color="primary">
                      <EmailIcon />
                    </Badge>
                  }
                >
                  <MenuItem
                    icon={<ArchiveIcon />}
                    component={
                      <NavLink className="sideNav2" to="/document/inbox" />
                    }
                  >
                    Gelen
                  </MenuItem>
                  <MenuItem
                    icon={
                      <Badge badgeContent={1} color="primary">
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
                      <Badge badgeContent={1} color="primary">
                        <AutoStoriesIcon />
                      </Badge>
                    }
                  >
                    Arhiw
                  </MenuItem>
                </SubMenu>
              </>
            ) : (
              <>
                <MenuItem
                  component={
                    <NavLink className="sideNav" to="/document/inbox" />
                  }
                  icon={<ArchiveIcon />}
                ></MenuItem>
                <MenuItem
                  component={<NavLink className="sideNav" to="/document/out" />}
                  icon={
                    <Badge badgeContent={1} color="primary">
                      <UnarchiveIcon />
                    </Badge>
                  }
                ></MenuItem>
                <MenuItem
                  component={
                    <NavLink className="sideNav" to="/document/archive" />
                  }
                  icon={
                    <Badge badgeContent={1} color="primary">
                      <AutoStoriesIcon />
                    </Badge>
                  }
                ></MenuItem>
              </>
            )}
            <MenuItem
              component={<NavLink className="sideNav" to="/new" />}
              icon={<NoteAddIcon />}
            >
              {open ? "Täze Resminama" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/account" />}
              icon={<AccountCircleIcon />}
            >
              {open ? "Profil" : ""}
            </MenuItem>
          </Menu>
        </Stack>
        <Stack>
          <Button
            sx={{
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              fontSize: "15px",
            }}
          >
            <HelpOutlineIcon sx={{ width: 30, height: 30 }} />
            Kömek
          </Button>
          <Button
            onClick={Logout}
            sx={{
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              fontSize: "15px",
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
