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
  Backdrop,
  Tooltip,
} from "@mui/material";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import { useCart } from "./contexts/cartcontext";
import { useUser } from "./contexts/usercontext";
export default function Cardproduct(props) {
  const { setloading, loading } = useCart();
  const [counter, setcounter] = useState(0);
  const [open, setopen] = useState(false);
  const { seller, getseller } = useUser();
  const apiUrl = "http://127.0.0.1:8000/api/cart/addToCart";
  const token = Cookies.get("token");

  const handleaddtocart = async (event) => {
    event.preventDafult;
    setloading(!loading);
    const formdata = new FormData();
    formdata.append("product_id", props.product.id);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(apiUrl, formdata, config);
      if (response.status === 201) {
        toast.success("Added to cart successfully");
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("Already added to cart");
      } else {
        toast.error("there was an error adding product to cart");
        console.error(error);
      }
    }
  };
  const showdetail = () => {
    setopen(true);
    getseller(props.product.seller_id);
    console.log(seller);
  };
  const increment = () => {
    if (counter < props.product.photos.length - 1) setcounter(counter + 1);
  };
  const decrement = () => {
    if (counter > 0) setcounter(counter - 1);
  };
  const handleClose = () => {
    setopen(false);
  };
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("phone number copied to clipboard");
      })
      .catch((err) => {
        toast.error("Failed to copy phone number: ", err);
      });
  };
  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        lg={3}
        md={4}
        className="my-5 flex justify-center z-0 bg-transparent"
        onClick={showdetail}
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
              className="hover:bg-orange-400 hover:text-white text-orange-400  "
            >
              <AddShoppingCartRoundedIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
      <Backdrop
        open={open}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box className=" bg-white rounded-2xl w-[50%] h-[90%] p-5">
          <Box className="relative  w-full h-full  overflow-auto">
            {props.product && props.product.photos && (
              <Card className=" p-10 shadow-none " key={props.product.id}>
                <CardMedia
                  className="w-[50%] h-[50%] mx-auto p-5 relative"
                  component="img"
                  image={
                    "http://127.0.0.1:8000/storage/" +
                    props.product?.photos[counter]
                  }
                  alt="Paella dish"
                />
                <IconButton
                  className="right-5 top-40 absolute"
                  onClick={increment}
                >
                  <KeyboardArrowRightRoundedIcon />
                </IconButton>
                <IconButton
                  className="left-5 top-40 absolute"
                  onClick={decrement}
                >
                  <KeyboardArrowLeftRoundedIcon />
                </IconButton>
                <CardContent className="flex flex-col items-start gap-4 my-5">
                  <Typography>{props.product?.name}</Typography>
                  <Typography>{props.product?.description}</Typography>
                  <Box className="flex justify-between w-full">
                    <Typography fontSize={"20px"}>
                      {props.product?.price} DA
                    </Typography>
                    <Rating
                      name="read-only"
                      value={props.product?.rating_avg}
                      readOnly
                    />
                  </Box>
                </CardContent>
                <CardActions className="relative flex justify-between py-5">
                  <div className="border-t-2 w-[33%]  top-0 absolute right-1/3"></div>
                  <Tooltip
                    title={
                      <>
                        <Box className="h-full w-full bg-blue">
                          {seller?.username}
                        </Box>
                      </>
                    }
                    disableFocusListener
                    className="flex  items-center gap-2"
                  >
                    <>
                      <Box className="f flex items-center gap-3">
                        <Box className="rounded-full h-10 w-10 border-2 hover:border-orange-400 flex justify-center items-center">
                          <img
                            src={
                              "http://127.0.0.1:8000/storage/" + seller?.image
                            }
                            alt="profile"
                            className="h-[90%] w-[90%] object-cover rounded-full"
                          />
                        </Box>
                        <Typography>{seller?.username}</Typography>
                      </Box>
                    </>
                  </Tooltip>
                  <Box className="flex items-center">
                    <IconButton onClick={() => copyToClipboard(seller?.phone)}>
                      <AddIcCallRoundedIcon />
                    </IconButton>
                    <Typography>{seller?.phone}</Typography>
                  </Box>
                </CardActions>
              </Card>
            )}
            <IconButton
              onClick={handleClose}
              className="top-0 left-0 m-3 absolute  rounded-full"
            >
              <HighlightOffRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </Backdrop>
    </>
  );
}
