import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import photo from "./assets/landingpageimage.svg";
import axios from "axios";
import "./style/home.css";
import Cookies from "js-cookie";

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
  IconButton,
  InputAdornment,
  Backdrop,
  List,
} from "@mui/material";
import Singlecart from "./Component/Singlecart.jsx";
import Card from "./Card.jsx";
import logo from "./assets/logo.svg";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function App() {
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
      <AppBar className="bg-white shadow-none ">
        <Toolbar className="flex justify-between ">
          <Link to={"/"}>
            <Box className="flex items-center cursor-pointer mr-10">
              <img src={logo} alt="Tajir" className="h-10" />
              <Typography
                className="text-3xl font-semibold text-slate-800 font-tajir px-2 "
                id="logo"
              >
                Tajir
              </Typography>
            </Box>
          </Link>

          <TextField
            placeholder="Search"
            className="w-1/3  "
            InputProps={{
              sx: { borderRadius: 10, height: "45px" },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            type="search"
          ></TextField>

          <Box className="flex gap-5 items-center">
            <Link to="/cart/">
              <IconButton>
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Link>
            <IconButton>
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            <Link to={"/login"}>
              <Button
                variant="contained"
                className="bg-orange-400 font-medium  text-base rounded-full  h-10 shadow-none mr-5 w-full "
                style={{ textTransform: "none" }}
              >
                Log in
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className="h-screen">
        <Box className="flex h-screen  items-center justify-between ">
          <Box className="flex flex-col gap-10">
            <Typography className="text-6xl font-medium">
              Find what <br /> you need
            </Typography>
            <Typography className="text-4xl font-medium">
              Discover
              <br /> you need
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

      <Container className="bg-white flex pt-5" maxWidth={"xl"}>
        <Box className="box_filter" minWidth={200}>
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
          <Grid container className="">
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
        <Box className=" bg-white h-[70%] rounded-lg p-5 relative">
          <List className="h-[90%] overflow-auto ">
            <Singlecart name={"laptop"}></Singlecart>
            <Singlecart
              name={"Table 4m"}
              price={"300"}
              qte={5}
              image={"../src/assets/bag.webp"}
            ></Singlecart>
            <Singlecart
              name={"toy car"}
              price={"3"}
              qte={3}
              image={"../src/assets/toy.webp"}
            ></Singlecart>
            <Singlecart
              name={"barndless shoe"}
              price={"30"}
              qte={5}
              image={"../src/assets/shoe.jpg"}
            ></Singlecart>
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
