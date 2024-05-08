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
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Addproduct = () => {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rating_avg, setRatingAvg] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [seller_id, setSellerId] = useState("");
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
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
        setRatingAvg(response.data.product.rating_avg);
        setDescription(response.data.product.description);
        setCategoryId(response.data.product.category_id.toString());
        setSellerId(response.data.product.seller_id.toString());
      } else {
        console.error("Failed to fetch product data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "price") setPrice(value);
    if (name === "rating_avg") setRatingAvg(value);
    if (name === "description") setDescription(value);
    if (name === "category_id") setCategoryId(value);
    if (name === "seller_id") setSellerId(value);
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };
  // ... (handleInputChange and handleFileChange functions remain the same)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("rating_avg", rating_avg);
    formData.append("description", description);
    formData.append("category_id", category_id);
    formData.append("seller_id", seller_id);
    photos.forEach((photo, index) => {
      formData.append(`photos[${index}]`, photo);
    });
    const token = Cookies.get("token");
    if (!token) {
      console.error("Token not found");
      setError("Token not found");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/product/storeProduct",
        formData,
        config
      );
      alert(response.data.message);
      if (response.status === 200) {
        setMessage("Product updated successfully");
        setError("");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.error("Error response:", err.response.data);
        setError(err.response.data.message || "Update failed");
      } else if (err.request) {
        console.error("No response received:", err.request);
        setError("No response received from the server");
      } else {
        console.error("Error:", err.message);
        setError("An error occurred while updating the product");
      }
    }
  };

  return (
    <Container  className="h-[90%] overflow-auto">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        {product && (
          <Box mb={4}>
            <Typography variant="h5" mt={2}>
              {product.name}
            </Typography>
            <Typography variant="subtitle1" mt={1}>
              Price: {product.price}
            </Typography>
            <Typography variant="subtitle1">
              Rating: {product.rating_avg}
            </Typography>
            <Typography variant="subtitle1">
              Description: {product.description}
            </Typography>
          </Box>
        )}
        <form onSubmit={handleSubmit} className="w-[80%]   ">
          <Box className="flex flex-col justify-center items-center gap-7 m-5">
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
              label="Rating"
              name="rating_avg"
              value={rating_avg}
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

            <TextField
              fullWidth
              variant="outlined"
              label="Category ID"
              name="category_id"
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
              InputProps={{ sx: { borderRadius: 3 } }}
              required
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Seller ID"
              name="seller_id"
              value={seller_id}
              onChange={(e) => setSellerId(e.target.value)}
              InputProps={{ sx: { borderRadius: 3 } }}
              required
            />

            <Box className="hover:bg-orange-100 rounded-full ">
              <label
                htmlFor="input-file"
                className="flex gap-5 text-gray-700  hover:text-orange-400 p-4"
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

            <Button
              type="submit"
              variant="contained"
              className="bg-orange-400 font-medium shadow-none text-base rounded-full  h-12  "
              style={{ textTransform: "none", width: "50%" }}
            >
              Add to nventory
            </Button>

            {message && (
              <Typography
                variant="body2"
                style={{ color: "green", marginTop: "20px" }}
              >
                {message}
              </Typography>
            )}
            {error && (
              <Typography
                variant="body2"
                style={{ color: "red", marginTop: "20px" }}
              >
                {error}
              </Typography>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Addproduct;
