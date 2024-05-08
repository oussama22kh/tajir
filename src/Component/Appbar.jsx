import logo from "../assets/logo.svg";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
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
} from "@mui/material";
import { useUser } from "../contexts/usercontext";
import { useEffect } from "react";
export default function Appbar() {
  const { user, setloading, loading } = useUser();
  useEffect(() => {
    setloading(!loading);
  }, []);
  return (
    <>
      <AppBar className="bg-white shadow-sm">
        <Toolbar className="flex justify-between ">
          <Box className="flex w-1/2">
            <Link to={"/"}>
              <Box className="flex items-center cursor-pointer mr-10">
                <img src={logo} alt="Tajir" className="h-10" />
                <Typography
                  className="text-3xl font-semibold text-slate-800 font-tajir px-2"
                  id="logo"
                >
                  Tajir
                </Typography>
              </Box>
            </Link>
            <TextField
              placeholder="Search"
              className="w-1/3  "
              InputProps={{
                sx: { borderRadius: 10, height: "45px" },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              type="search"
            ></TextField>
          </Box>

          <Box className="flex gap-5 items-center">
            <Link to="/cart">
              <IconButton>
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Link>
            <IconButton>
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            {user ? (
              <Link to={"/profile"}>
                <Box className="rounded-full h-10 w-10 border-2 border-orange-400 flex justify-center items-center">
                  <img
                    src={"http://127.0.0.1:8000/storage/" + user?.image}
                    alt="profile"
                    className="h-[90%] w-[90%] object-cover rounded-full"
                  />
                </Box>
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
