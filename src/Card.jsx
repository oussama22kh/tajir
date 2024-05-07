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
} from "@mui/material";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import photo from "./assets/97915.jpg";
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
      if (response.status == 200) {
        console.log("success");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Grid item xs={12} sm={6} lg={4} md={4} className="my-5 p-3 mx-5">
        <Card className="w-72">
          <CardMedia
            className="w-52 h-60 mx-auto"
            component="img"
            image={`http://127.0.0.1:8000/storage/${props.product.photos[0]}`}
            alt="Paella dish"
          />
          <CardContent>
            <Typography> {props.product.name} </Typography>
          </CardContent>
          <CardActions>
            <Typography>$ {props.product.price}</Typography>
            <IconButton onClick={handleaddtocart}>
              <AddShoppingCartIcon />
            </IconButton>
            <IconButton>
              <VisibilityOutlinedIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
