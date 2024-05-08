import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import photo from "./assets/landingpageimage.svg";
import axios from "axios";
import "./style/home.css";
import cartphoto from "./assets/cart.svg";

import {
  Button,
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  Backdrop,
  List,
} from "@mui/material";
import Singlecart from "./Component/Singlecart.jsx";
import Card from "./Card.jsx";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Appbar from "./Component/Appbar.jsx";
import { useCart } from "./contexts/cartcontext.jsx";
import { useUser } from "./contexts/usercontext.jsx";
function App() {
  const { user, setloading, loading } = useUser();
  useEffect(() => {
    setloading(!loading);
  }, []);
  const { carts } = useCart();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [products, setProducts] = useState([]);
  const [pagination, setpagination] = useState([]);
  const [URL, setURL] = useState("http://127.0.0.1:8000/api/products");
  const getData = async () => {
    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        console.log(response.data.products);
        setpagination(response.data.paginate);
        console.log(response.data.paginate);
        setProducts(response.data.products);
      } else {
        console.error("Failed to fetch user data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handlePrevPage = () => {
    if (pagination.current_page > 1) {
      setURL(pagination.prev_page_url);
    }
  };

  const handleNextPage = () => {
    if (pagination.current_page < pagination.last_page) {
      setURL(pagination.next_page_url);
    }
  };

  useEffect(() => {
    getData(URL);
  }, [URL]);
  return (
    <>
      <Appbar></Appbar>
      {!user && (
        <Container maxWidth="lg" className="h-screen">
          <Box className="flex h-screen  items-center justify-between ">
            <Box className="flex flex-col gap-10">
              <Typography className="text-6xl font-medium">
                Find what <br /> you need
              </Typography>
              <Typography className="text-4xl font-medium">
                Discover
                <br /> more
              </Typography>
              <Link to={"/signup"}>
                <Button
                  variant="contained"
                  className="bg-orange-400 font-medium shadow-none text-base rounded-full  h-12  "
                  style={{ textTransform: "none" }}
                >
                  Sign up for free
                </Button>
              </Link>
            </Box>
            <img
              src={photo}
              alt="products"
              className="w-[50%] "
              style={{ width: "45%" }}
            />
          </Box>
        </Container>
      )}
      <Container
        className=" flex pt-5 mt-16 h-screen "
        maxWidth={"xl"}
      >
        <Box className="box_filter " minWidth={200}>
          <div className="container">
            <div className="category">
              <h1>Category</h1>
              <form className="form_category">
                <div className="items">
                  <input
                    type="radio"
                    id="phone"
                    name="category"
                    value="phone"
                  />
                  <label htmlFor="phone">Phone</label>
                </div>
                <div className="items">
                  <input
                    type="radio"
                    id="laptop"
                    name="category"
                    value="phone"
                  />
                  <label htmlFor="laptop">Labtop</label>
                </div>
                <div className="items">
                  <input type="radio" id="bag" name="category" value="phone" />
                  <label htmlFor="bag">Bag</label>
                </div>
                <div className="items">
                  <input
                    type="radio"
                    id="product"
                    name="category"
                    value="phone"
                  />
                  <label htmlFor="product">Product</label>
                </div>
                <div className="items">
                  <input
                    type="radio"
                    id="shose"
                    name="category"
                    value="phone"
                  />
                  <label htmlFor="shose">Shose</label>
                </div>
              </form>
            </div>
            <div className="price">
              <h1>price</h1>
              <form className="form_price">
                <TextField
                  className="textField"
                  fullWidth
                  type="number"
                  label="min"
                  value={0}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 1, width: 70, height: 35 },
                  }}
                ></TextField>
                <TextField
                  className="textField"
                  fullWidth
                  type="number"
                  label="max"
                  value={100}
                  variant="outlined"
                  id="firstname"
                  InputProps={{
                    sx: { borderRadius: 1, width: 70, height: 35 },
                  }}
                ></TextField>
              </form>
            </div>
            <div className="rating">
              <h1>rating_avg</h1>
              <form className="form_rating">
                <TextField
                  className="textField"
                  fullWidth
                  type="number"
                  label="Rating"
                  value={0}
                  variant="outlined"
                  id="firstname"
                  InputProps={{
                    sx: { borderRadius: 1, width: 70, height: 35 },
                  }}
                ></TextField>
              </form>
            </div>
            <div className="buttons">
              <Button
                onClick={handlePrevPage}
                className={
                  pagination.prev_page_url ? "prev button" : " desActive"
                }
              >
                Prev
              </Button>
              <Button
                onClick={handleNextPage}
                className={
                  pagination.next_page_url ? "next button" : " desActive"
                }
              >
                Next
              </Button>
            </div>
          </div>
        </Box>
        <Box>
          {/*<div className="select">
            <ul>
              <li className="active">All</li>
              <li>NEW</li>
              <li>old</li>
              <li>Ordermore</li>
              <li>Popular</li>
              <li>Favorites</li>
              <li>Recommended</li>
            </ul>
          </div>*/}
          <Grid container className="gap-5 flex justify-center">
            {products.map((product, index) => (
              <Card className="mx-3" product={product} key={index} />
            ))}
          </Grid>
        </Box>
      </Container>
      <IconButton
        className="fixed bottom-0 right-0 bg-orange-500 text-white m-5"
        onClick={handleOpen}
      >
        <ShoppingCartOutlinedIcon />
      </IconButton>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        className="flex"
      >
        <Box className=" bg-[#F8FAFD] h-[80%] rounded-lg p-5 relative w-[50%]">
          <List className="h-[90%] overflow-auto  ">
            {carts.length > 0 ? (
              carts.map((item, index) => (
                <Singlecart
                  key={index}
                  name={item.name}
                  price={item.price}
                  qte={item.qte}
                  image={"http://127.0.0.1:8000/storage/" + item.image}
                  id={item.id}
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-full w-full">
                <img src={cartphoto} className="w-[50%] h-[50%] opacity-70" />
              </div>
            )}
          </List>
          <Button onClick={handleClose} className="right-5 absolute mt-5">
            Close
          </Button>
        </Box>
      </Backdrop>
    </>
  );
}

export default App;
