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
import { useSeller } from "../contexts/sellercontext";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useState } from "react";

export default function Sellercard() {
  const { product, deleteproduct, setOpenproduct } = useSeller();
  const [counter, setcounter] = useState(0);
  const increment = () => {
    if (counter < product.photos.length - 1) setcounter(counter + 1);
  };
  const decrement = () => {
    if (counter > 0) setcounter(counter - 1);
  };

  const handledelete = () => {
    deleteproduct(product.id);
    setOpenproduct(false);
  };
  return (
    <>
      {product && product.photos && (
        <Card className=" p-10 shadow-none rounded-2xl " key={product.id}>
          <CardMedia
            className="w-[60vh] h-[50vh] mx-auto p-5 relative"
            component="img"
            image={"http://127.0.0.1:8000/storage/" + product?.photos[counter]}
            alt="Paella dish"
          />
          <IconButton className="right-5 top-40 absolute" onClick={increment}>
            <KeyboardArrowRightRoundedIcon />
          </IconButton>
          <IconButton className="left-5 top-40 absolute" onClick={decrement}>
            <KeyboardArrowLeftRoundedIcon />
          </IconButton>
          <CardContent className="flex flex-col items-start gap-4">
            <Typography>{product?.name}</Typography>
            <Typography>{product?.description}</Typography>
            <Rating name="read-only" value={product?.rating_avg} readOnly />
          </CardContent>
          <CardActions className="flex justify-between">
            <Typography fontSize={"20px"}>$ {product?.price}</Typography>
            <IconButton
              className="hover:bg-orange-400 hover:text-white text-orange-400 "
              onClick={handledelete}
            >
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </>
  );
}
