import {
  Button,
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Checkbox,
  Menu,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  Backdrop,
  List,
  Breadcrumbs,
  Drawer,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";
import Sidebar from "./Component/Sidebar.jsx";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import EditIcon from "@mui/icons-material/Edit";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useUser } from "./contexts/usercontext.jsx";
import { Outlet } from "react-router-dom";

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (event.target.id === "account-img") {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = (event) => {
    if (getZIndexById(event.target.id) != 10) {
      setAnchorEl(null);
    }
  };
  const { user, logout } = useUser();
  const buyeritems = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Profile", icon: <PersonIcon />, path: "" },
    { name: "History", icon: <HistoryEduIcon />, path: "history" },
    { name: "Edit", icon: <EditIcon />, path: "edit" },
    { name: "Cart", icon: <ShoppingCartOutlinedIcon />, path: "/cart" },
    { name: "Join us", icon: <AddBusinessIcon />, path: "joinus" },
    { name: "Feedback", icon: <ThumbsUpDownIcon />, path: "feedback" },
  ];

  const selleritems = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Profile", icon: <PersonIcon />, path: "" },
    { name: "History", icon: <HistoryEduIcon />, path: "history" },
    { name: "Edit", icon: <EditIcon />, path: "edit" },
    { name: "Cart", icon: <ShoppingCartOutlinedIcon />, path: "/cart" },
    { name: "My Store", icon: <StorefrontIcon />, path: "mystore" },
    { name: "Feedback", icon: <ThumbsUpDownIcon />, path: "feedback" },
  ];

  return (
    <>
      <header>
        <nav className="">
          <Box className=" h-20 w-screen px-10 fixed top-0 flex justify-between items-center">
            <Link to="/">
              <Box className="flex items-center cursor-pointer mx-8 ">
                <img src={logo} alt="Tajir" className="h-10" />
                <Typography
                  className="text-3xl font-semibold text-slate-800 font-tajir px-2 "
                  id="logo"
                >
                  Tajir
                </Typography>
              </Box>
            </Link>
            <Box
              className="flex justify-end items-center gap-5 "
              onClick={handleClose}
            >
              <SearchIcon></SearchIcon>
              <NotificationsIcon></NotificationsIcon>
              <Box
                className="rounded-full h-10 w-10 border-2 border-orange-400 flex justify-center items-center relative active:opacity-50"
                onClick={handleClick}
                id="account-menu"
              >
                <img
                  id="account-img"
                  src={"http://127.0.0.1:8000/storage/" + user?.image}
                  alt="profile"
                  className="h-[90%] w-[90%] object-cover rounded-full absolute z-10 "
                  onClick={handleClick}
                />
                <Menu anchorEl={anchorEl} open={open}>
                  <MenuItem >
                    <Typography
                      onClick={logout}
                      className="hover:cursor-pointer"
                      fontWeight={"medium"}
                      marginInline={1}
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Typography>{user?.username}</Typography>
            </Box>
          </Box>
        </nav>
      </header>
      <Sidebar items={user?.role === 0 ? buyeritems : selleritems}></Sidebar>
      <Container
        maxWidth="xl"
        className="flex justify-center h-[90vh] w-screen items-center mt-[10vh] rounded-2xl bg-white"
      >
        <Outlet />
      </Container>
    </>
  );
}

function getZIndexById(id) {
  const element = document.getElementById(id);
  if (element) {
    const zIndex = window.getComputedStyle(element).getPropertyValue("z-index");
    return zIndex;
  }
  return null;
}
