import laptop from "../assets/97915.jpg";
import { RiCoupon3Fill } from "react-icons/ri";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { FaPercentage } from "react-icons/fa";
import { FaPercentage } from "react-icons/fa";
import "../style/discout.css";
import {
  TextField,
  Box,
  Card,
  CardContent,
  CardMedia,
  ListItem,
  CardActions,
  Button,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { SiToggltrack } from "react-icons/si";
import { IoToggleSharp } from "react-icons/io5";
import { PiToggleLeftFill } from "react-icons/pi";
import { FaPercent } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/cartcontext.jsx";
import axios from "axios";
// import Discount from "./Discount.jsx";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
};

export default function Singlecart({
  id,
  image,
  name,
  price,
  qte,
  is_ordered,
  new_price,
  value,
}) {
  const { deletecartitem, updatecart } = useCart();
  const [qteValue, setQteValue] = useState(qte);
  const [loading, setloading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [useDiscount, SetuseDiscount] = useState(new_price ? true : false);
  const [selectDiscount, setSelectDiscount] = useState(null);
  const [Search, SetSearch] = useState("");
  const [coupon, SetCopon] = useState(null);
  const [selectCoupon , SetSelectCoupon]=useState(null)
  const navigate = useNavigate()
  

  const [discounts, setDiscounts] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };


  useEffect(() => {
    FetchDiscounts();
    if (Cookies.get("discount_id")) {
      setDiscounts(
        discounts.filter(
          (discount) => discount.id !== Cookies.get("discount_id")
        )
      );
    }
  }, [open]);

  const FetchDiscounts = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/discount/${id}`,
        config
      );
      if (res.status === 200) {
        console.log(res.data);
        setDiscounts(res.data.discounts);
      } else console.log("errrrror");
    } catch (e) {
      console.log(e);
    }
  };

  const [deleting, setdeleting] = useState(false);
  useEffect(() => {
    updatecart(id, qteValue);
  }, [qteValue]);
  const handledelete = () => {
    setdeleting(true);
    deletecartitem(id);
  };
  const handelActiveDiscount = async (disc_id, disc) => {
    SetuseDiscount(false);
    
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/discount/activate/${disc_id}`,
        {
          cart_id: id,
        },
        config
      );
      console.log(id);
      console.log(res.data);
      if (res.status === 200) {
        Cookies.set("discount_id", disc_id);
        SetuseDiscount(true);
        setSelectDiscount(disc);
        setDiscounts(discounts.filter((discount) => discount.id !== disc_id));
      }
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e);
    }
  };
  const handelDesactiveDiscount = async () => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/discount/deactivate/${id}`,
        {},
        config
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        SetuseDiscount(false);
        setSelectDiscount(null);
        FetchDiscounts();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handelSearch = async (e) => {
    e.preventDefault();
    if (Search.length !== 6) {
      toast.error("search input must be 6 caracters");
    }
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/discount/searchCoupon`,
        {
          cart_id: id,
          search: Search,
        },
        config
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        SetCopon(res.data.coupon);
        console.log(res.data.coupon);
      }
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e);
    }
  };
  const handelActiveCoupon = async (coupon_id , coupon) => {
    handelDesactiveDiscount()
    SetuseDiscount(false);
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/discount/activateCoupon/${coupon_id}`,
        {
          cart_id: id,
        },
        config
      );
      if (res.status === 200) {
        SetCopon(null);
        SetSelectCoupon(coupon)
        toast.success(res.data.message)
        SetuseDiscount(true);
      }
    }catch (e) {
      console.log(e);
    }

  }

  const increaseqte = (e) => {
    setloading(true);
    setQteValue(qteValue + 1);
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };
  const decreaseqte = (e) => {
    if (qteValue > 1) {
      setloading(true);

      setQteValue(qteValue - 1);
      setTimeout(() => {
        setloading(false);
      }, 1000);
    }
  };

  

  const renderActive = (disc) => {
    return (
      <div className="active bg-green-200 flex justify-between items-center p-5 mx-7 rounded-xl">
        <div className="percent flex justify-between items-center  text-green-800 ms-3">
          <p className="text-2xl me-1"> {disc.discount} </p>
          <FaPercent className="" />
        </div>
        <button
          className="border-2 shadow-lg py-1 px-4 bg-white rounded-full text-green-800 flex justify-between items-center text-2xl"
          onClick={() => handelDesactiveDiscount()}
        >
          active <SiToggltrack className="ms-3" />
        </button>
      </div>
    );
  };

  const valideSetActive = (disc_id, disc) => {
    if (useDiscount) {
      handelDesactiveDiscount();
      handelActiveDiscount(disc_id, disc);
    } else {
      handelActiveDiscount(disc_id, disc);
    }
  };

  const renderDescounts = (array) => {
    if (!Array.isArray(array) || array.length === 0) {
      return <p className="text-center mt-5 fs-5">No Discount Available </p>;
    }
    return array.map((e) => (
      <div
        key={e.id}
        className="items bg-red-100 flex justify-between items-center p-5 mx-7 rounded-xl mb-2"
      >
        <div className="percent flex justify-between items-center text-red-800 ms-3">
          <p className="text-2xl me-1"> {e.discount} </p>
          <FaPercent className="" />
        </div>
        <button
          onClick={() => handelActiveDiscount(e.id, e)}
          // disabled={useDiscount}
          className="border-2 shadow-lg py-1 px-4 bg-white rounded-full text-red-800 flex justify-between items-center text-2xl"
        >
          <SiToggltrack className="me-3" /> desactive
        </button>
      </div>
    ));
  };

  return (
    <>
      <ListItem>
        <Card className="p-5 flex  w-full shadow-md rounded-xl m-5 relative  ">
          <CardMedia className="flex justify-center items-center ms-3">
            <img
              src={image}
              alt="product"
              width={"140px"}
              className="rounded-lg  "
            />
          </CardMedia>
          <Box className="flex flex-col items-start mx-10 w-full ">
            <Box className="flex justify-between items-center w-[100%] mb-2">
                <Typography fontSize={16} className="font-medium text-lg ">
                  {name}
                </Typography>
                 {useDiscount && <p className="text-xl text-orange-500">{new_price}.00 DA</p>}
            </Box>
            
            <Box className="flex items-center justify-between w-full ">
              <Typography fontSize={16} className="font-medium ">
                {useDiscount ? <del>{price}.00 DA</del> : <p> {price}.00 DA </p>}
              </Typography>
              <Box className="flex justify-center items-center">
                {is_ordered != 0 && (
                  <Typography className="text-bold" fontSize={12}>
                    <u className="text-base cursor-pointer"
                    onClick={()=>navigate('/profile/history')}>Waiting for seller approval</u>
                  </Typography>
                )}
                {loading ? (
                  <CircularProgress className="text-orange-400" />
                ) : (
                  <>
                    {is_ordered != 0 ? (
                      <Button
                        variant="contained"
                        disabled={true}
                        className="rotate-45 absolute top-[10%] left-[81%] shadow-md  bg-orange-400 text-white text-[90%]"
                        sx={{ width: "25%" }}
                      >
                        Ordered
                      </Button>
                    ) : (
                      <>
                        <IconButton onClick={decreaseqte}>
                          <RemoveCircleOutlineRoundedIcon className="hover:text-orange-400" />
                        </IconButton>
                        <Typography fontSize={17} className="font-medium">
                          {qte}
                        </Typography>
                        <IconButton onClick={increaseqte}>
                          <AddCircleOutlineRoundedIcon className="hover:text-orange-400" />
                        </IconButton>
                      </>
                    )}
                  </>
                )}
              </Box>
              <Box>
                <IconButton onClick={handleOpen}>
                  <RiCoupon3Fill className="hover:text-orange-400" />
                </IconButton>
                {!is_ordered && (
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                  >
                    <div className="bg-white lg:w-[40vw] md:w-[55%]  sm:w-[70%] rounded-xl min-h-72">
                      <div className="flex flex-col justify-between min-h-80 w-full">
                        <div className="flex text-xl justify-between text-black px-8 py-5">
                          <h1 className="font-bold"> Discounts </h1>
                          <button className="text-4xl" onClick={handleClose}>
                            <HighlightOffRoundedIcon />
                          </button>
                        </div>
                        <div className="All_discout flex-col ">
                          {useDiscount && selectDiscount === null && (
                            <div className="active bg-green-200 flex justify-between items-center p-5 mx-7 rounded-xl">
                              <div className="percent flex justify-between items-center  text-green-800 ms-3">
                                <p className="text-2xl me-1"> {value} </p>
                                <FaPercent className="" />
                              </div>
                              <button
                                className="border-2 shadow-lg py-1 px-4 bg-white rounded-full text-green-800 flex justify-between items-center text-2xl"
                                onClick={() => handelDesactiveDiscount()}
                              >
                                active <SiToggltrack className="ms-3" />
                              </button>
                            </div>
                          )}
                          {selectDiscount && renderActive(selectDiscount)}
                          <div className="discout my-3"></div>
                          {renderDescounts(discounts)}
                          {/* {renderDescunts(array)} */}
                          <div className="coupon mb-20">
                            {coupon && (
                              <div
                                key={coupon.id}
                                className="items bg-gray-100 flex justify-between items-center p-5 mx-7 rounded-xl mb-2"
                              >
                                <div className="percent flex justify-between items-center text-gray-800 ms-3">
                                  <p className="text-2xl me-1"> {coupon.percentage}</p>
                                   <FaPercent className="" />
                                </div>
                                <button
                                   onClick={() => handelActiveCoupon(coupon.id , coupon)}
                                  className="border-2 shadow-lg py-1 px-4 bg-white rounded-full text-gray-800 flex justify-between items-center text-2xl"
                                >
                                  <SiToggltrack className="me-3" /> desactive
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <form
                          className="flex Group_form shadow-sm"
                          onSubmit={handelSearch}
                        >
                          <input
                            className="input_copon"
                            value={Search.toUpperCase()}
                            onChange={(e) =>
                              SetSearch(e.target.value.toUpperCase())
                            }
                            type="text"
                            placeholder="Search Coupon"
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            className="bg-orange-400 font-medium  text-base  rounded-3xl btn  h-10    "
                            style={{ textTransform: "none" }}
                          >
                            Search
                          </Button>
                        </form>
                      </div>
                    </div>
                  </Backdrop>
                )}
              </Box>
            </Box>
          </Box>
          {deleting ? (
            <CircularProgress className=" text-orange-400 absolute top-2 right-2" />
          ) : (
            <>
              {is_ordered === 0 && (
                <IconButton
                  onClick={handledelete}
                  className="absolute top-0 right-0"
                >
                  <HighlightOffRoundedIcon />
                </IconButton>
              )}
            </>
          )}
        </Card>
      </ListItem>
      {/* <Discount
        show={showFormDiscount}
        handleClose={handleHideDiscountForm}
        onSave={handleSaveFormDiscount}
        cart={id}
        effect={updateeffect}
      /> */}
    </>
  );
}

Singlecart.defaultProps = {
  name: "ProductName",
  price: 0,
  qte: 1,
  image: laptop,
};
