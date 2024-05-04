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
export default function Appbar({user}) {
  return (
    <>
      <AppBar className="bg-white shadow-none ">
        <Toolbar className="flex justify-between ">
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

          <Box className="flex gap-5 items-center">
            <Link to="/cart/">
              <IconButton>
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Link>
            <IconButton>
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            {user ? (
              <Link to={"/profile"}>
                <Box className="rounded-full h-10 w-10 bg-black"></Box>
              </Link>
            ) : (
              <Link to={"/login"}>
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
