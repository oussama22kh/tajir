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
import axios from "axios";

export default function Sellercard() {
  const {
    product,
    deleteproduct,
    setOpenproduct,
    token,
    UpdatePhotos,
    updatedetail,
  } = useSeller();
  const [counter, setcounter] = useState(0);
  const [showUpdateDetailsForm, setShowUpdateDetailsForm] = useState(false);
  const [showUpdatePhotosForm, setShowUpdatePhotosForm] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    description: product?.description || "",
    quantity: product?.quantity || "",
  });
  const [photos, setPhotos] = useState([]);

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

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const url = `http://127.0.0.1:8000/api/product/updateProduct/${product.id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(url, formData, config);
      if (response.status === 200) {
        console.log(response.data.message);
        console.log(response.data.product);
        setShowUpdateDetailsForm(false); // Hide form on success
      }
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleUpdatePhotos = async (e) => {
    e.preventDefault();
    const url = `http://127.0.0.1:8000/api/product/updatePhotos/${product.id}`;
    const formData = new FormData();
    photos.forEach((photo, index) => {
      formData.append(`photos[${index}]`, photo);
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(url, formData, config);
      if (response.status === 200) {
        console.log(response.data.message);
        console.log(response.data.product);
        setShowUpdatePhotosForm(false); // Hide form on success
      }
    } catch (error) {
      console.error(
        "Error updating photos:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      {!showUpdateDetailsForm ? (
        <>
          {!showUpdatePhotosForm ? (
            <>
              {product && product.photos && (
                <Card
                  className=" p-10 shadow-none rounded-2xl "
                  key={product.id}
                >
                  <CardMedia
                    className="w-[60vh] h-[50vh] mx-auto p-5 relative"
                    component="img"
                    image={
                      "http://127.0.0.1:8000/storage/" +
                      product?.photos[counter]
                    }
                    alt="Paella dish"
                  />
                  <IconButton
                    className="right-5 top-40 absolute"
                    onClick={increment}
                  >
                    <KeyboardArrowRightRoundedIcon />
                  </IconButton>
                  <IconButton
                    className="left-5 top-40 absolute"
                    onClick={decrement}
                  >
                    <KeyboardArrowLeftRoundedIcon />
                  </IconButton>
                  <CardContent className="flex flex-col items-start gap-4">
                    <Typography>{product?.name}</Typography>
                    <Typography>{product?.description}</Typography>
                    <Rating
                      name="read-only"
                      value={product?.rating_avg}
                      readOnly
                    />
                  </CardContent>
                  <CardActions className="flex justify-between">
                    <Typography fontSize={"20px"}>
                      {product?.price} DA
                    </Typography>
                    <IconButton
                      className="hover:bg-orange-400 hover:text-white text-orange-400 "
                      onClick={handledelete}
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                    <Button
                      className="hover:bg-blue-400 hover:text-white text-blue-400"
                      onClick={() => setShowUpdateDetailsForm(true)}
                    >
                      Update Details
                    </Button>
                    <Button
                      className="hover:bg-green-400 hover:text-white text-green-400"
                      onClick={() => setShowUpdatePhotosForm(true)}
                    >
                      Update Photos
                    </Button>
                  </CardActions>
                </Card>
              )}
            </>
          ) : (
            <Box component="form" onSubmit={handleUpdatePhotos} className="p-4">
              <Typography variant="h6">Update Product Photos</Typography>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setPhotos(Array.from(e.target.files))}
              />
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
              <Button
                onClick={() => setShowUpdatePhotosForm(false)}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box component="form" onSubmit={handleUpdateProduct} className="p-4">
          <Typography variant="h6">Update Product Details</Typography>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button
            onClick={() => setShowUpdateDetailsForm(false)}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </Box>
      )}
    </>
  );
}
