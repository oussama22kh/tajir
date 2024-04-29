import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";
import photo from "./assets/login.svg";
import Cookies from 'js-cookie';
import axios from "axios";

import {
  Button,
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Checkbox,
} from "@mui/material";

function Login() {
  const handleSubmit = async (event) => {
    console.log("hi");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await axios.post("http://127.0.0.1:8000/api/login", data);
    if(response.status === 200){
        Cookies.set('token', response.data.token, { expires: 7 });
        console.log(response.data);
        setData(response.data);
        alert(response.data.buyer.username) ;
    }else{
      alert('you have a problem !!') ;
      if(response.status === 401){
        alert(response.data);
      }
    }
  };
  return (
    <>
      <Link to={"/"}>
        <Box className="flex items-center m-5">
          <img src={logo} alt="Tajir" />
          <Typography
            className="text-4xl font-semibold text-slate-800 font-tajir px-2"
            id="logo"
          >
            Tajir
          </Typography>
        </Box>
      </Link>
      <Container maxWidth="lg">
        <Box className="flex justify-center ">
          <Box className="flex flex-col ">
            <Typography className=" p-5 font-semibold text-4xl text-orange-600">
              Earn reward pionts &
              <br /> 
              Get Discounts %
            </Typography>
            <Typography className=" py-4 px-10 font-medium">
              ✔ Find Products that you need at the best prices <br />
              ✔ Follow your favorite seller on there Social Media <br /> to get
              coupons for even more discounts!
            </Typography>
            <img src={photo} alt="key man" />
          </Box>
          <form onSubmit={handleSubmit}>
          <Box
            className="bg-white border-stone-300  rounded-xl shadow-lg flex  flex-col items-center justify-around "
            height={600}
            width={500}
            p={5}
          >
            <Typography className="text-5xl font-medium">Log in</Typography>

            <Typography>
              New to Tajir?{" "}
              <Link to={"/signup"} className="text-orange-600 underline">
                Sign up for free
              </Link>
            </Typography>
            <TextField
              fullWidth
              label="Email address*"
              variant="outlined"
              name="email"
              type="email"
              InputProps={{ sx: { borderRadius: 3 } }}
            ></TextField>
            <TextField
              fullWidth
              label="Password (8+ characters)*"
              variant="outlined"
              type="password"
              name="password"
              InputProps={{ sx: { borderRadius: 3 } }}
            ></TextField>

            <Button
              variant="contained"
              type="submit"
              className="bg-orange-400 font-medium  text-lg rounded-full w-72 h-12 "
              style={{ textTransform: "none" }}
            >
              Log in
            </Button>
          </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Login;
