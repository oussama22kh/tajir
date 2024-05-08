import React, { useEffect, useState } from "react";
import { Button, Container, Box, Typography, List } from "@mui/material";
import { UserProvider } from "../contexts/usercontext.jsx";
import Singlecart from "./Singlecart.jsx";

import Appbar from "./Appbar.jsx";
import { useCart } from "../contexts/cartcontext.jsx";
import cartphoto from "../assets/cart.svg";

function Cart() {
  const { total, carts } = useCart();

  return (
    <>
      <Appbar></Appbar>
      <Container
        className="h-[90vh] mt-[10vh] flex justify-center rounded-2xl bg-white  "
        maxWidth={"lg"}
      >
        {carts.length > 0 ? (
          <>
            <List className="h-full overflow-auto flex flex-col items-center   bg-white rounded-lg ">
              {carts.map((item, index) => (
                <Singlecart
                  key={index}
                  name={item.name}
                  price={item.price}
                  qte={item.qte}
                  image={"http://127.0.0.1:8000/storage/" + item.image}
                  id={item.id}
                />
              ))}
            </List>
            <Box className="flex flex-col items-center w-1/5  ml-10 h-52 rounded-lg bg-white">
              <Typography
                fontSize={"1.5rem"}
                className="bg-orange-400 rounded-lg px-10 py-2 m-5 text-white"
              >
                Total:
              </Typography>
              <Typography fontSize={"1.5rem"} className="">
                ${total}
              </Typography>
            </Box>
          </>
        ) : (
          <div className="flex justify-center items-center self-center w-[50%] h-[50%] ">
            <img src={cartphoto} className="opacity-75" />
          </div>
        )}
      </Container>
    </>
  );
}

export default Cart;
