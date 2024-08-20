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
import { Badge } from "@mui/material";

const menuItems = [
  { title: "Baş sahypa", link: "/", icon: <HomeIcon /> },
  { title: "Dolandyryş", link: "/dashboard", icon: <DashboardIcon /> },
  {
    title: "Gelen",
    link: "/document/inbox",
    icon: (
      <Badge badgeContent={1} color="primary">
        <ArchiveIcon />
      </Badge>
    ),
  },
  {
    title: "Giden",
    link: "/document/out",
    icon: (
      <Badge badgeContent={1} color="primary">
        <UnarchiveIcon />
      </Badge>
    ),
  },
  {
    title: " Arhiw",
    link: "/document/archive",
    icon: (
      <Badge badgeContent={1} color="primary">
        <AutoStoriesIcon />
      </Badge>
    ),
  },
  { title: "Täze Resminama", link: "/document/new", icon: <NoteAddIcon /> },
  { title: "Söhbetdeşlik", link: "/chat", icon: <HomeIcon /> },
  { title: "Profil", link: "/account", icon: <AccountCircleIcon /> },
  { title: "Buýruklar", link: "/orders", icon: <BorderColorIcon /> },
  { title: "Işgärler", link: "/employees", icon: <Diversity3Icon /> },
  { title: "Bildiriş", link: "/notifications", icon: <NotificationsIcon /> },
];
export default menuItems;
