import { Typography, Box, Button, Alert } from "@mui/material";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api/profile/updateImage";
const token = Cookies.get("token");
export default function Edit() {
  const [image, setimage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(apiUrl, formData, config);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (err) {
      if (err.request.status === 422) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <Box>
        <Typography>Edting 📝</Typography>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            name="image"
            onChange={(e) => setimage(e.target.files[0])
            }
          />
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </form>
      </Box>
    </>
  );
}
