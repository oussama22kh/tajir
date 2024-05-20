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
  Typography,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/cartcontext.jsx";

export default function Singlecart({
  id,
  image,
  name,
  price,
  qte,
  is_ordered,
}) {
  const { deletecartitem, updatecart } = useCart();
  const [qteValue, setQteValue] = useState(qte);
  const [loading, setloading] = useState(false);
  const [deleting, setdeleting] = useState(false);
  useEffect(() => {
    updatecart(id, qteValue);
  }, [qteValue]);
  const handledelete = () => {
    setdeleting(true);
    deletecartitem(id);
    setTimeout(() => {
      setdeleting(false);
    }, 2000);
  };

  const increaseqte = (e) => {
    setloading(true);
    setQteValue(qteValue + 1);
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };
  const decreaseqte = (e) => {
    if (qteValue > 1) {
      setloading(true);

      setQteValue(qteValue - 1);
      setTimeout(() => {
        setloading(false);
      }, 1000);
    }
  };
  return (
    <>
      <ListItem>
        <Card className="p-5 flex  w-full shadow-md rounded-xl m-5 relative  ">
          <CardMedia>
            <img
              src={image}
              alt="product"
              width={"140px"}
              className="rounded-lg"
            />
          </CardMedia>
          <Box className="flex flex-col items-start mx-10 w-full">
            <Typography fontSize={16} className="font-medium">
              {name}
            </Typography>
            <Box className="flex items-center justify-between w-full mt-16">
              <Typography fontSize={16} className="font-medium ">
                ${price}
              </Typography>
              <Box className="flex justify-center items-center">
                {is_ordered != 0 && (
                  <Typography fontSize={12}>
                    Waiting for seller approval
                  </Typography>
                )}
                {loading ? (
                  <CircularProgress className="text-orange-400" />
                ) : (
                  <>
                    {is_ordered != 0 ? (
                      <Button
                        variant="contained"
                        disabled={true}
                        className="rotate-45 absolute top-[10%] left-[81%] shadow-md  bg-orange-400 text-white text-[90%]"
                        sx={{ width: "25%" }}
                      >
                        Ordered
                      </Button>
                    ) : (
                      <>
                        <IconButton onClick={decreaseqte}>
                          <RemoveCircleOutlineRoundedIcon className="hover:text-orange-400" />
                        </IconButton>
                        <Typography fontSize={17} className="font-medium">
                          {qte}
                        </Typography>
                        <IconButton onClick={increaseqte}>
                          <AddCircleOutlineRoundedIcon className="hover:text-orange-400" />
                        </IconButton>
                      </>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Box>
          {deleting ? (
            <CircularProgress className=" text-orange-400 absolute top-2 right-2" />
          ) : (
            <>
              {is_ordered === 0 && (
                <IconButton
                  onClick={handledelete}
                  className="absolute top-0 right-0"
                >
                  <HighlightOffRoundedIcon />
                </IconButton>
              )}
            </>
          )}
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
