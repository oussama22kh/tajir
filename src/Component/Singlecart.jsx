import laptop from "../assets/97915.jpg";

import {
  TextField,
  Box,
  Card,
  CardContent,
  CardMedia,
  ListItem,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/cartcontext.jsx";

export default function Singlecart({ id, image, name, price, qte }) {
  const { deletecartitem } = useCart();

  const handledelete = () => {
    deletecartitem(id);
  };
  return (
    <>
      <ListItem>
        <Card className="p-5 flex justify-between w-full  rounded-xl m-5">
          <CardContent className="flex gap-4">
            <CardMedia className="">
              <img src={image} alt="product" width={"100px"} />
            </CardMedia>
            <h1 className="">{name}</h1>
          </CardContent>
          <CardActions className="flex items-start ">
            <h1 className="font-semibold m-3">${price}</h1>
            <TextField
              type="number"
              defaultValue={qte}
              className="w-15"
              helperText="QTE"
              InputProps={{
                sx: { borderRadius: "15px", height: "35px", width: "60px" },
              }}
            ></TextField>
            <Button className="bg-orange-400 text-white rounded-full ">
              Buy
            </Button>
            <IconButton onClick={handledelete}>
              <DeleteOutlineIcon />
            </IconButton>
          </CardActions>
        </Card>
      </ListItem>
    </>
  );
}

Singlecart.defaultProps = {
  name: "ProductName",
  price: 0,
  qte: 1,
  image: laptop,
};
