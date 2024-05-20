import { Typography, Box, Button, Alert, TextField } from "@mui/material";

import { useState, useEffect } from "react";

import { useUser } from "../contexts/usercontext";
import toast from "react-hot-toast";

export default function Edit() {
  const [image, setimage] = useState("");
  const { user, updateimage } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    updateimage(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="h-full w-[40%] self-center">
        <Box className="m-10 bg-white shadow-md rounded-lg p-10 flex flex-col gap-10 ">
          <TextField
            value={user?.username}
            fullWidth
            label="User name"
          ></TextField>
          <TextField
            value={user.phone ? user.phone : ""}
            fullWidth
            label="Phone number"
          ></TextField>
          <TextField
            
            value={user.address ? user.address : "null"}
            fullWidth
            label="Address"
          ></TextField>
          <TextField value={user?.email} fullWidth label="Email"></TextField>
          <TextField
            value={user?.role == 0 ? "Buyer 🛒" : "Seller 🤝"}
            disabled
            fullWidth
            label="Account"
          ></TextField>
          <Box>
            <input
              type="file"
              name="image"
              onChange={(e) => setimage(e.target.files[0])}
            />
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}
