import { Typography, Box, Backdrop, Button } from "@mui/material";
import Addproduct from "./ProductForm.jsx";
import { useState } from "react";
export default function Mystore() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Button onClick={handleOpen}>add Product</Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        className="flex "
      >
        <Box className=" bg-white  rounded-lg  w-[50%] h-[90%] p-5 relative">
          <Addproduct></Addproduct>
          <Button onClick={handleClose} className="right-5 absolute mt-5">
            Cancel
          </Button>
        </Box>
      </Backdrop>
    </>
  );
}
