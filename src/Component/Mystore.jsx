import {
  Typography,
  Box,
  Backdrop,
  Button,
  IconButton,
  Grid,
  Container,
} from "@mui/material";
import Sellercard from "./Sellercard.jsx";
import Sellerdetailcard from "./Sellerdetailcard.jsx";
import Addproduct from "./ProductForm.jsx";
import { useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import UpgradeRoundedIcon from "@mui/icons-material/UpgradeRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useSeller } from "../contexts/sellercontext.jsx";
export default function Mystore() {
  const [open, setOpen] = useState(false);
  const [update, setOpenupdate] = useState(false);
  const { product, products, openproduct, setOpenproduct } = useSeller();
  const handleClose = () => {
    setOpen(false);
    setOpenupdate(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenupdate = () => {
    setOpenupdate(true);
  };
  const handleCloseproduct = () => {
    setOpenproduct(false);
  };

  return (
    <>
      <Container className="flex flex-col items-center gap-9   p-5">
        <Box>
          <Button
            onClick={handleOpen}
            style={{ textTransform: "none" }}
            className="rounded-full px-5 gap-2 text-black"
          >
            <AddCircleOutlineRoundedIcon /> Add Product
          </Button>
          <Button
            onClick={handleOpenupdate}
            style={{ textTransform: "none" }}
            className="rounded-full px-5 gap-2 text-black"
          >
            <UpgradeRoundedIcon /> Update Product
          </Button>
        </Box>
        <Grid container className="gap-5 flex w-full  justify-center ">
          {products.map((product, index) => (
            <Sellercard className="mx-3" product={product} key={index} />
          ))}
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        className="flex "
      >
        <Box className=" bg-white  rounded-lg  w-[50%] h-[95vh] p-5 relative">
          <Addproduct></Addproduct>

          <IconButton
            onClick={handleClose}
            className="top-0 left-0 m-3 absolute  rounded-full"
          >
            <HighlightOffRoundedIcon />
          </IconButton>
        </Box>
      </Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={update}
        className="flex "
      >
        <Box className=" bg-white  rounded-lg  w-[70%] h-[90%] p-5 relative overflow-auto">
          <Grid container className="gap-5 flex justify-center ">
            {products.map((product, index) => (
              <Sellercard className="mx-3" product={product} key={index} />
            ))}
          </Grid>
          <IconButton
            onClick={handleClose}
            className="top-0 left-0 m-3 absolute  rounded-full"
          >
            <HighlightOffRoundedIcon />
          </IconButton>
        </Box>
      </Backdrop>

      {product && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openproduct}
          className="flex justify-center items-center"
        >
          <Box className="bg-white rounded-lg  w-[50%] p-5 relative overflow-auto">
            <Sellerdetailcard className="mx-3" />
            <IconButton
              onClick={handleCloseproduct}
              className="top-0 left-0 m-3 absolute  rounded-full"
            >
              <HighlightOffRoundedIcon />
            </IconButton>
          </Box>
        </Backdrop>
      )}
    </>
  );
}
