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
export default function Appbar() {
  const { user, setloading, loading } = useUser();
  useEffect(() => {
    setloading(!loading);
  }, []);
  return (
    <>
      <AppBar className="bg-white shadow-sm">
        <Toolbar className="flex justify-between ">
          <Box className="flex w-1/2 items-center">
            <Link to={"/"}>
              <Box className="flex items-center cursor-pointer mr-10">
                <img src={logo} alt="Tajir" className="h-9" />
                <Typography
                  className="text-3xl font-semibold text-slate-800 font-tajir px-2"
                  id="logo"
                >
                  Tajir
                </Typography>
              </Box>
            </Link>
            <InputBase
              placeholder="Search"
              className="w-1/3 border-2 focus-within:border-orange-300  c px-5 py-1 rounded-full"
              type="search"
            />
          </Box>
          <HomeIcon />
          <Box className="flex gap-5 items-center">
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
                    src={"http://127.0.0.1:8000/storage/" + user?.image}
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
                  className="bg-orange-400 font-medium  text-base rounded-full  h-10 shadow-none mr-5 w-full "
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
