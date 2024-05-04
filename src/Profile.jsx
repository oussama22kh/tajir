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

import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
export default function Profile() {
  const buyeritems = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Profile", icon: <PersonIcon />, path: "" },
    { name: "History", icon: <HistoryEduIcon />, path: "history" },
    { name: "Edit", icon: <EditIcon />, path: "edit" },
    { name: "Cart", icon: <ShoppingCartOutlinedIcon />, path: "/cart" },
    { name: "Join us", icon: <AddBusinessIcon />, path: "joinus" },
    { name: "Feedback", icon: <ThumbsUpDownIcon />, path: "feedback" },
  ];
  const apiUrl = "http://127.0.0.1:8000/api/profile";
  const token = Cookies.get("token");
  const [user, setuser] = useState();
  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setuser(data["buyer"]);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <>
      <nav>
        <Box className=" h-28 w-screen p-10 fixed top-0 flex justify-between">
          <Link to="/">
            <Box className="flex items-center cursor-pointer mx-8">
              <img src={logo} alt="Tajir" className="h-10" />
              <Typography
                className="text-3xl font-semibold text-slate-800 font-tajir px-2 "
                id="logo"
              >
                Tajir
              </Typography>
            </Box>
          </Link>
          <Box className="flex justify-end items-center gap-5">
            <SearchIcon></SearchIcon>
            <NotificationsIcon></NotificationsIcon>
            <Box className="rounded-full h-16 w-16 border-2 border-orange-400 flex justify-center items-center">
              <img
                src={"http://127.0.0.1:8000/storage/" + user?.image}
                alt="profile"
                className="h-[90%] w-[90%] object-cover rounded-full"
              />
            </Box>
            <Typography>{user?.username}</Typography>
          </Box>
        </Box>
      </nav>
      <Sidebar items={buyeritems}></Sidebar>
      <Container
        maxWidth="sm"
        className="flex justify-center h-screen items-center"
      >
        <Outlet />
      </Container>
    </>
  );
}
