import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Box,
  Typography,
  List,
  Backdrop,
  TextField,
} from "@mui/material";
import { UserProvider } from "../contexts/usercontext.jsx";
import Singlecart from "./Singlecart.jsx";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import Appbar from "./Appbar.jsx";
import { useCart } from "../contexts/cartcontext.jsx";
import cartphoto from "../assets/cart.svg";

function Cart() {
  const { total, carts, loading, setloading, setorder } = useCart();
  const [open, setopen] = useState(false);
  let orderlist = new Set();
  useEffect(() => {
    setloading(!loading);
  }, []);
  const handleopen = () => {
    setopen(true);
  };
  const handleclose = () => {
    setopen(false);
  };
  const handleorderlist = (e) => {
    if (e.target.checked) {
      orderlist.add(e.target.id);
      console.log(orderlist);
    } else if (orderlist.has(e.target.id)) {
      orderlist.delete(e.target.id);
      console.log(orderlist);
    }
  };
  const handleorder = () => {
    for (const value of orderlist) {
      setorder(value);
    }
  };
  return (
    <>
      <Appbar></Appbar>
      <Container
        className=" h-full mt-[10vh] flex justify-between flex-col items-center rounded-2xl bg-white p-10 shadow-sm "
        maxWidth={"lg"}
      >
        {carts.length > 0 ? (
          <>
            <Box className="flex justify-between w-full">
              <List className=" flex flex-col items-center w-[90%] bg-white rounded-lg ">
                {carts.map((item, index) => (
                  <Singlecart
                    key={index}
                    name={item.name}
                    price={item.price}
                    qte={item.qte}
                    image={"http://127.0.0.1:8000/storage/" + item.image}
                    id={item.id}
                    is_ordered={item.is_ordered}
                    new_price={item.new_price}
                    value={item.discount}
                  />
                ))}
              </List>
              <Box className="w-[50%] flex flex-col gap-10 shadow-md m-1 p-5 h-full rounded-lg">
                <TextField
                  type="tel"
                  label="Phone number"
                  InputProps={{ sx: { borderRadius: 3 } }}
                  helperText="Optional* Please enter your current phone number"
                ></TextField>
                <TextField
                  type="text"
                  label="Address"
                  InputProps={{ sx: { borderRadius: 3 } }}
                  helperText="Optional* Please enter your current Address "
                ></TextField>
                <Button
                  variant="contained"
                  className=" justify-between bg-orange-400 font-medium   rounded-lg  h-14 px-5 "
                  sx={{ textTransform: "none" }}
                  onClick={handleopen}
                >
                  <Typography fontSize={20}>Total : ${total} </Typography>
                  <Typography fontSize={20}>
                    Checkout
                  </Typography>
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <div className="flex justify-center items-center self-center size-[90vh]">
            <img src={cartphoto} className="opacity-75" />
          </div>
        )}
      </Container>
      <Backdrop
        open={open}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box className="w-[40%] min-h-[30%] bg-white rounded-lg p-10 flex flex-col justify-between">
          <List>
            {carts.map((item, index) => (
              <>
                {item.is_ordered == 0 && (
                  <Box key={item.id} className="flex justify-between mb-5">
                    <Box>
                      <Typography color={"black"}>
                        {index + 1}. {item.name} , qte : {item.qte}
                      </Typography>
                      <img
                        src={"http://127.0.0.1:8000/storage/" + item.image}
                        className="w-20 rounded-lg"
                      />
                    </Box>
                    <input
                      type="checkbox"
                      id={item.id}
                      className="h-5 w-5"
                      onChange={handleorderlist}
                    ></input>
                  </Box>
                )}
              </>
            ))}
          </List>

          <Box className="self-end flex gap-5">
            <Button onClick={handleclose} >Cancel</Button>
            <Button onClick={handleorder} variant="contained" className="bg-orange-400 rounded-full">
              Order
            </Button>
          </Box>
        </Box>
      </Backdrop>
    </>
  );
}

export default Cart;
