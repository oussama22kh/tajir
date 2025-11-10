import logo from "../assets/logo.svg";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Link } from "react-router-dom";
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
  InputBase,
} from "@mui/material";
import { useUser } from "../contexts/usercontext";
import { useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { getStorageUrl } from "../config/api.js";
export default function Appbar() {
  const { user, setloading, loading } = useUser();
  useEffect(() => {
    setloading(!loading);
  }, []);
  return (
    <>
      <AppBar className="bg-white shadow-sm">
        <Toolbar className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 px-2 sm:px-4">
          <Box className="flex w-full sm:w-1/2 items-center gap-2 sm:gap-4">
            <Link to={"/"}>
              <Box className="flex items-center cursor-pointer mr-2 sm:mr-10">
                <img src={logo} alt="Tajir" className="h-7 sm:h-9" />
                <Typography
                  className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 font-tajir px-1 sm:px-2"
                  id="logo"
                >
                  Tajir
                </Typography>
              </Box>
            </Link>
            <InputBase
              placeholder="Search"
              className="hidden sm:block w-full sm:w-1/2 md:w-1/3 border-2 focus-within:border-orange-300 px-3 sm:px-5 py-1 rounded-full text-sm sm:text-base"
              type="search"
            />
          </Box>
          <Box className="flex gap-2 sm:gap-5 items-center w-full sm:w-auto justify-between sm:justify-end">
            <HomeIcon className="hidden sm:block" />
            <Link to="/cart">
              <IconButton className="hover:text-orange-400 hover:bg-transparent">
                <ShoppingCartRoundedIcon />
              </IconButton>
            </Link>
            <Link to="/notification">
              <IconButton className="hover:text-orange-400 hover:bg-transparent">
                <NotificationsRoundedIcon />
              </IconButton>
            </Link>
            {user ? (
              <Link
                to={"/profile"}
                className="flex justify-center items-center"
              >
                <Box className="rounded-full h-10 w-10 border-2 hover:border-orange-400 flex justify-center items-center me-3">
                  <img
                    src={getStorageUrl(user?.image)}
                    alt="profile"
                    className="h-[90%] w-[90%] object-cover rounded-full"
                  />
                </Box>
                <h1 className="text-black text-xl"> {user?.username} </h1>
              </Link>
            ) : (
              <Link to={"/login/"}>
                <Button
                  variant="contained"
                  className="bg-orange-400 font-medium text-sm sm:text-base rounded-full h-9 sm:h-10 shadow-none w-full sm:w-auto sm:mr-5"
                  style={{ textTransform: "none" }}
                >
                  Log in
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
