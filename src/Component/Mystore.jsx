import {
  Typography,
  Box,
  Backdrop,
  Button,
  Grid,
  Container,
} from "@mui/material";
import Sellercard from "./Sellercard.jsx";
import Addproduct from "./ProductForm.jsx";
import { useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import UpgradeRoundedIcon from "@mui/icons-material/UpgradeRounded";
import { useSeller } from "../contexts/sellercontext.jsx";
export default function Mystore() {
  const [open, setOpen] = useState(false);
  const { product, products, openproduct, setOpenproduct } = useSeller();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseproduct = () => {
    setOpenproduct(false);
  };

  return (
    <>
      <Container className="flex flex-col items-center gap-9 h-[90vh] p-10">
        <Box>
          <Button
            onClick={handleOpen}
            style={{ textTransform: "none" }}
            className="rounded-full px-5 gap-2"
          >
            <AddCircleOutlineRoundedIcon /> Add Product
          </Button>
          <Button
            onClick={handleOpen}
            style={{ textTransform: "none" }}
            className="rounded-full px-5 gap-2"
          >
            <UpgradeRoundedIcon /> Update Product
          </Button>
        </Box>
        <Grid container className="gap-5 flex justify-center overflow-auto">
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
        <Box className=" bg-white  rounded-lg  w-[50%] h-[90%] p-5 relative">
          <Addproduct></Addproduct>
          <Button
            onClick={handleClose}
            className="right-5 absolute mt-5 rounded-full px-5"
          >
            Cancel
          </Button>
        </Box>
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openproduct}
        className="flex "
      >
        <Box className=" bg-white  rounded-lg  w-[50%] h-[90%] p-5 relative">
          {/*<Sellercard className="mx-3" product={product} />*/}
          <Button
            onClick={handleCloseproduct}
            className="right-5 absolute mt-5 rounded-full px-5"
          >
            Cancel
          </Button>
        </Box>
      </Backdrop>
    </>
  );
}
