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
import { useState } from "react";
export default function Singlecart({ image, name, price, qte }) {
  return (
    <>
      <ListItem>
        <Card className="p-5 flex justify-between w-full shadow-none border-b-2 rounded-none">
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
            <IconButton>
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
