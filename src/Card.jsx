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
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardHeader,
  IconButton,
  Rating,
} from "@mui/material";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { useCart } from "./contexts/cartcontext";
export default function Cardproduct(props) {
  const { setloading, loading } = useCart();
  const apiUrl = "http://127.0.0.1:8000/api/cart/addToCart";
  const token = Cookies.get("token");
  const handleaddtocart = async (event) => {
    event.preventDafult;
    setloading(!loading);
    console.log(props.product.id);
    const formdata = new FormData();
    formdata.append("product_id", props.product.id);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(apiUrl, formdata, config);
      if (response.status === 200) {
        console.log("success");
      }
    } catch (error) {
      if (error.response.status === 409) {
        console.log("Already added to cart");
      } else {
        console.error(error);
      }
    }
  };
  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        lg={3}
        md={4}
        className="my-5 flex justify-center  "
      >
        <Card className="min-w-60 p-3 shadow-md rounded-2xl hover:bg-[#F8FAFD]">
          <CardMedia
            className="w-72 h-60 mx-auto p-5"
            component="img"
            image={`http://127.0.0.1:8000/storage/${props.product.photos[0]}`}
            alt="Paella dish"
          />
          <CardContent className="flex flex-col items-start gap-4">
            <Typography className="hover:underline cursor-pointer">
              {props.product.name}
            </Typography>
            <Rating
              name="read-only"
              value={props.product.rating_avg}
              readOnly
            />
          </CardContent>
          <CardActions className="flex justify-between">
            <Typography fontSize={"20px"}>$ {props.product.price}</Typography>
            <IconButton
              onClick={handleaddtocart}
              className="hover:bg-orange-400 hover:text-white text-orange-400"
            >
              <AddShoppingCartRoundedIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
