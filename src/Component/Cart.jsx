import React from "react";
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
  List,
  Backdrop,
} from "@mui/material";
import logo from "/src/assets/logo.svg";
import cart from "/src/assets/cart.svg";
import Singlecart from "./Singlecart.jsx";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";

function Cart() {
  return (
    <>
      <AppBar className="bg-white shadow-none ">
        <Toolbar className="flex justify-between ">
          <Link to={"/"}>
            <Box className="flex items-center cursor-pointer mr-10">
              <img src={logo} alt="Tajir" className="h-10" />
              <Typography
                className="text-3xl font-semibold text-slate-800 font-tajir px-2 "
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
            <Link to={"/login"}>
              <Button
                variant="contained"
                className="bg-orange-400 font-medium  text-base rounded-full  h-10 shadow-none mr-5 w-full "
                style={{ textTransform: "none" }}
              >
                Log in
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container className="h-full pt-28 flex justify-center" maxWidth={"lg"}>
        <List className="h-full overflow-auto flex flex-col items-center  shadow-lg bg-white rounded-lg">
          <Singlecart name={"laptop 14"}></Singlecart>
          <Singlecart
            name={"Table 4m"}
            price={20}
            qte={5}
            image={"../src/assets/bag.webp"}
          ></Singlecart>
          <Singlecart
            name={"toy war truck 20cm "}
            price={3}
            qte={3}
            image={"../src/assets/toy.webp"}
          ></Singlecart>
          <Singlecart
            name={"Balck 45 size barndless shoe"}
            price={30}
            qte={5}
            image={"../src/assets/shoe.jpg"}
          ></Singlecart>
          <Singlecart
            name={"barndless shoe"}
            price={30}
            qte={5}
            image={"../src/assets/shoe.jpg"}
          ></Singlecart>
        </List>
        <Box className="flex flex-col items-center w-1/5 shadow-lg ml-10 h-52 rounded-lg bg-white">
          <Typography
            fontSize={"1.5rem"}
            className="bg-orange-400 rounded-lg px-10 py-2 m-5 text-white"
          >
            Total:
          </Typography>
          <Typography fontSize={"1.5rem"} className="">
            $500
          </Typography>
        </Box>
      </Container>
      <Button className="fixed bottom-5 right-5 bg-blue-500 text-white">
        Save
      </Button>
    </>
  );
}

export default Cart;
