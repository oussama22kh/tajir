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
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ThumbsUpDownRoundedIcon from "@mui/icons-material/ThumbsUpDownRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
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
    { name: "Home", icon: <HomeRoundedIcon />, path: "/" },
    { name: "Profile", icon: <PersonRoundedIcon />, path: "" },
    { name: "History", icon: <HistoryEduRoundedIcon />, path: "history" },
    { name: "Edit", icon: <EditRoundedIcon />, path: "edit" },
    { name: "Cart", icon: <ShoppingCartRoundedIcon />, path: "/cart" },
    { name: "Join us", icon: <AddBusinessRoundedIcon />, path: "joinus" },
    { name: "Feedback", icon: <ThumbsUpDownRoundedIcon />, path: "feedback" },
  ];

  const selleritems = [
    { name: "Home", icon: <HomeRoundedIcon />, path: "/" },
    { name: "Profile", icon: <PersonRoundedIcon />, path: "" },
    { name: "History", icon: <HistoryEduRoundedIcon />, path: "history" },
    { name: "Edit", icon: <EditRoundedIcon />, path: "edit" },
    { name: "Cart", icon: <ShoppingCartRoundedIcon />, path: "/cart" },
    { name: "My Store", icon: <StorefrontRoundedIcon />, path: "mystore" },
    { name: "Feedback", icon: <ThumbsUpDownRoundedIcon />, path: "feedback" },
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
              <SearchRoundedIcon></SearchRoundedIcon>
              <NotificationsRoundedIcon></NotificationsRoundedIcon>
              <Box
                className="rounded-full h-10 w-10 border-2 border-orange-400 flex justify-center items-center relative active:opacity-50 hover:bg-white"
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
                  <MenuItem className="hover:bg-white">
                    <Typography
                      onClick={logout}
                      className="hover:cursor-pointer "
                      fontWeight={"medium"}
                      marginInline={1}
                    >
                      <LogoutRoundedIcon />
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
