import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import photo from "./assets/landingpageimage.svg";
import axios from "axios";
import "./style/home.css";
import cartphoto from "./assets/cart.svg";
import { MdTune } from "react-icons/md";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import Complaint from "./Component/Complaint.jsx";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Singlecart from "./Component/Singlecart.jsx";
import Card from "./Card.jsx";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Appbar from "./Component/Appbar.jsx";
import { useCart } from "./contexts/cartcontext.jsx";
import { useUser } from "./contexts/usercontext.jsx";
import emotionReact_isolatedHnrs from "@emotion/react/_isolated-hnrs";
function App() {
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [pagination, setpagination] = useState([]);
  const [openfilter, setOpendfilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [second, setsecond] = useState(false);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    if (ads.length === 0) return;

    const slider = sliderRef.current;
    let index = 0;

    const scrollImages = () => {
      if (!slider) return;
      index = (index + 1) % ads.length;
      slider.scrollTo({
        left: slider.clientWidth * index,
        behavior: "smooth",
      });
    };

    intervalRef.current = setInterval(scrollImages, 2000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [ads]);

  const { user, setloading, loading } = useUser();
  useEffect(() => {
    setloading(!loading);
  }, []);
  const { carts } = useCart();
  const newcarts = carts.filter((item) => item.is_validate == 0);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handelSecond = () => {
    setsecond(!second);
  };
  const handelOpenFilter = () => {
    setOpendfilter(true);
  };
  const handlecloseFilter = () => {
    setOpendfilter(false);
  };
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios("http://127.0.0.1:8000/api/ads");
        if (response.status === 200) {
          setAds(response.data.ads);
        }
        setAds(data.ads);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []);

  const constructURL = () => {
    let baseURL = "http://127.0.0.1:8000/api/products?";
    let params = [];

    if (search) params.push(`search=${search}`);
    if (minPrice) params.push(`min_price=${minPrice}`);
    if (maxPrice) params.push(`max_price=${maxPrice}`);
    if (selectedCategory) params.push(`category_id=${selectedCategory}`);

    return baseURL + params.join("&");
  };
  useEffect(() => {
    setURL(constructURL());
  }, [search, selectedCategory, minPrice, maxPrice]);
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setOpendfilter(false);
    setURL(constructURL());
  };
  const [URL, setURL] = useState("http://127.0.0.1:8000/api/products");
  const getData = async () => {
    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        setpagination(response.data.paginate);

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

  const GetCategories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/categories");
      if (res.status === 200) {
        setCategories(res.data.categories);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    GetCategories();
  }, []);

  useEffect(() => {
    getData(URL);
  }, [URL]);

  return (
    <>
      <Appbar></Appbar>
      <Container maxWidth="lg" className="p-0 mt-16">
        <div className="container ">
          <div className="slider-wapper overflow-hidden">
            <div className="slider overflow-hidden" ref={sliderRef}>
              {ads.map((ad, index) => (
                <img
                  key={ad.id}
                  id={`slider-${index + 1}`}
                  src={`http://127.0.0.1:8000/storage/${ad.image}`}
                  alt={`Ad ${index + 1}`}
                />
              ))}
            </div>
            <div className="slider_nav">
              {ads.map((ad, index) => (
                <a key={ad.id} href={`#slider-${index + 1}`}></a>
              ))}
            </div>
          </div>
        </div>
      </Container>
      {/* <Container maxWidth="lg" className="p-0">
      <div className="container">
        <div className="slider-wapper">
          <div className="slider" ref={sliderRef}>
            <img id="silder-1" src="https://images.pexels.com/photos/20155362/pexels-photo-20155362/free-photo-of-cans-of-soda-standing-on-the-shelves.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <img id="silder-2" src="https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <img id="silder-3" src="https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <img id="silder-4" src="https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          </div>
          <div className="slider_nav">
            <a href="#silder-1"></a>
            <a href="#silder-2"></a>
            <a href="#silder-3"></a>
            <a href="#silder-4"></a>
          </div>
        </div>
      </div>
    </Container> */}
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
        className=" flex p-0 mt-16 h-screen justify-center "
        maxWidth={"xl"}
      >
        <Box className="w-screen">
          <Box className="flex justify-center ">
            <Box className="mt-20 mb-5 flex flex-wrap items-center">
              <button
                onClick={handelOpenFilter}
                className="px-3 py-2 rounded-lg text-2xl border-2 border-orange-300 mx-3 text-white bg-orange-400 hover:bg-white hover:text-orange-400 mb-3 "
              >
                {" "}
                <MdTune />
              </button>
              {!second
                ? categories &&
                  categories.slice(0, 6).map((e, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedCategory(e.id)}
                      className="px-3 py-2 rounded-lg text-xl border-2 border-orange-300 mx-3 hover:bg-orange-400 hover:text-white mb-3"
                    >
                      {e.name}
                    </button>
                  ))
                : categories &&
                  categories.slice(6).map((e, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedCategory(e.id)}
                      className="px-3 py-2 rounded-lg text-xl border-2 border-orange-300 mx-3 hover:bg-orange-400 hover:text-white mb-3"
                    >
                      {e.name}
                    </button>
                  ))}
              {!second ? (
                <button
                  onClick={handelSecond}
                  className="px-3 py-2 rounded-lg text-xl  mx-3 hover:bg-orange-400 hover:text-white text-orange-400 mb-3"
                >
                  <FaAngleDoubleRight />
                </button>
              ) : (
                <button
                  onClick={handelSecond}
                  className="px-3 py-2 rounded-lg text-xl mb-3  mx-3 hover:bg-orange-400 hover:text-white text-orange-400"
                >
                  <FaAngleDoubleLeft />
                </button>
              )}
            </Box>

            <Backdrop
              open={openfilter}
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <Box className="lg:w-[40vw] md:w-[55%]  sm:w-[90%]  overflow-auto bg-white rounded-2xl p-5 flex flex-col justify-between ">
                <div className="flex justify-between w-[100%] text-black mb-5 px-5">
                  <h1 className="text-bold  text-2xl">Filter</h1>
                  <HighlightOffRoundedIcon
                    className="cursor-pointer"
                    onClick={handlecloseFilter}
                  />
                </div>
                <Box className="flex justify-center mt-3">
                  <form onSubmit={handleFilterSubmit} className=" w-[80%] ">
                    <TextField
                      label="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      fullWidth
                      InputProps={{ sx: { borderRadius: 4, paddingLeft: 2 } }}
                      className="mb-5 "
                    />

                    <Box className="flex justify-between">
                      <TextField
                        label="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        type="number"
                        InputProps={{ sx: { borderRadius: 4 } }}
                        className="mb-5 w-[49%]"
                      />
                      <TextField
                        label="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        type="number"
                        className="mb-5 w-[49%]"
                        InputProps={{ sx: { borderRadius: 4 } }}
                      />
                    </Box>
                    <Box className="flex ">
                      <FormControl fullWidth className="mb-5 rounded-xl ">
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                          label="categotry"
                          labelId="category"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          sx={{ borderRadius: 4 }}
                        >
                          {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box className="flex justify-center mb-5">
                      <Button
                        type="submit"
                        variant="contained"
                        className="bg-orange-400 rounded-xl px-9"
                      >
                        Apply Filters
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Box>
            </Backdrop>
          </Box>
          <Grid container className=" flex justify-center w-full gap-5">
            {products.map((product, index) => (
              <Card
                className=""
                style={{ margin: "0px 70px" }}
                product={product}
                key={index}
              />
            ))}
          </Grid>
          <div className="box_filter w-[100%] flex justify-center items-center">
            <div className="buttons flex items-center min-w-[300px] justify-between">
              <Button
                onClick={handlePrevPage}
                className={
                  pagination.prev_page_url ? "prev button" : " desActive"
                }
              >
                Prev
              </Button>
              <Box>
                {pagination.current_page} <span className="mx-3">Of</span>{" "}
                {pagination.last_page}
              </Box>
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
      </Container>
      <IconButton
        className="fixed bottom-0 right-0 bg-orange-500 text-white m-5"
        onClick={handleOpen}
      >
        <ShoppingCartRoundedIcon />
      </IconButton>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        className="flex"
      >
        <Box className=" bg-[#F8FAFD] h-[80%] rounded-lg p-5 relative w-[50%]">
          <List className="h-[90%] overflow-auto  ">
            {newcarts.length > 0 ? (
              newcarts.map((item, index) => (
                <Singlecart
                  key={index}
                  name={item.name}
                  price={item.price}
                  qte={item.qte}
                  image={"http://127.0.0.1:8000/storage/" + item.image}
                  id={item.id}
                  is_ordered={item.is_ordered}
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-full w-full">
                <img src={cartphoto} className="w-[50%] h-[50%] opacity-70" />
              </div>
            )}
          </List>
          <IconButton
            onClick={handleClose}
            className="top-0 right-0 m-3 absolute rounded-full"
          >
            <HighlightOffRoundedIcon />
          </IconButton>
        </Box>
      </Backdrop>
      <Complaint />
    </>
  );
}

export default App;
