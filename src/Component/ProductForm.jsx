import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Avatar,
  Grid,
  Container,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useSeller } from "../contexts/sellercontext";

const Addproduct = () => {
  const { categories, addproduct } = useSeller();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  /*useEffect(() => {
    getProductData();
  }, []);

  const getProductData = async () => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("Token not found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/product",
        config
      );
      if (response.status === 200) {
        setProduct(response.data.product);
        setName(response.data.product.name);
        setPrice(response.data.product.price);
        setDescription(response.data.product.description);
        setCategoryId(response.data.product.category_id.toString());
      } else {
        console.error("Failed to fetch product data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };*/
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "price") setPrice(value);
    if (name === "description") setDescription(value);
    if (name === "category_id") setCategoryId(value);
  };

  // ... (handleInputChange and handleFileChange functions remain the same)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category_id", category_id);
    formData.append("quantity", 3);
    photos.forEach((photo, index) => {
      formData.append(`photos[${index}]`, photo);
    });
    addproduct(formData);
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files.map((file) => URL.createObjectURL(file)));
    setPhotos(files);
  };
  return (
    <Container className="h-full w-full overflow-auto">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={4}
        className=""
      >
        <form onSubmit={handleSubmit} className="w-[80%] h-full ">
          <Box className="flex flex-col justify-center items-center gap-7   h-full">
            <Typography className="text-black"> Add Product 📦</Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              name="name"
              value={name}
              onChange={handleInputChange}
              InputProps={{ sx: { borderRadius: 3 } }}
              required
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Price"
              name="price"
              value={price}
              onChange={handleInputChange}
              InputProps={{ sx: { borderRadius: 3 } }}
              required
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Description"
              name="description"
              value={description}
              onChange={handleInputChange}
              InputProps={{ sx: { borderRadius: 3 } }}
              required
            />
            <FormControl fullWidth>
              <InputLabel id="category-id">Category *</InputLabel>
              <Select
                label="Category *"
                fullWidth
                variant="outlined"
                name="category_id"
                labelId="category-id"
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
                sx={{ borderRadius: 3 }}
                required
              >
                {categories.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              type="number"
              required
              className="w-15"
              label="Quantity"
              fullWidth
              InputProps={{ sx: { borderRadius: 3 } }}
            ></TextField>
            <Box className="hover:bg-[#F8FAFD] rounded-full  ">
              <label
                htmlFor="input-file"
                className="flex gap-5 text-gray-700  hover:text-orange-400 px-4 py-2 cursor-pointer"
              >
                <UploadFileIcon className="" />
                <h3>Upload images</h3>
              </label>
              <input
                id="input-file"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
                required
              />
            </Box>
            <Box className="flex flex-wrap gap-4 mt-4">
              {selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Selected ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg hover:border-4 hover:border-orange-400 cursor-pointer"
                />
              ))}
            </Box>

            <Button
              type="submit"
              variant="contained"
              className="bg-orange-400 font-medium shadow-none text-base rounded-full  h-12  "
              style={{ textTransform: "none", width: "50%" }}
            >
              Add to nventory
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Addproduct;
