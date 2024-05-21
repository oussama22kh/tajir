import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Box,
  Typography,
  List,
  Backdrop,
  TextField,
} from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { UserProvider } from "../contexts/usercontext.jsx";
import Singlecart from "./Singlecart.jsx";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import Appbar from "./Appbar.jsx";
import { useCart } from "../contexts/cartcontext.jsx";
import cartphoto from "../assets/cart.svg";

function Cart() {
  const { total, carts, loading, setloading, setorder } = useCart();
  const [open, setopen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const cities = [
    "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Algiers",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arreridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
  "Timimoun",
  "Bordj Badji Mokhtar",
  "Ouled Djellal",
  "Béni Abbès",
  "In Salah",
  "In Guezzam",
  "Touggourt",
  "Djanet",
  "El M'Ghair",
  "El Meniaa"
  ];
  let orderlist = new Set();
  useEffect(() => {
    setloading(!loading);
  }, []);
  const handleopen = () => {
    setopen(true);
  };
  const handleclose = () => {
    setopen(false);
  };
  const handleorderlist = (e) => {
    if (e.target.checked) {
      orderlist.add(e.target.id);
      console.log(orderlist);
    } else if (orderlist.has(e.target.id)) {
      orderlist.delete(e.target.id);
      console.log(orderlist);
    }
  };
  const handleorder = () => {
    for (const value of orderlist) {
      setorder(value);
    }
  };
  return (
    <>
      <Appbar></Appbar>
      <Container
        className=" h-full mt-[10vh] flex justify-between flex-col items-center rounded-2xl bg-white p-10 shadow-sm mt-28 "
        maxWidth={"lg"}
      >
        {carts.length > 0 ? (
          <>
            <Box className="flex justify-between w-full">
              <List className=" flex flex-col items-center w-[90%] bg-white rounded-lg ">
                {carts.map((item, index) => (
                  <Singlecart
                    key={index}
                    name={item.name}
                    price={item.price}
                    qte={item.qte}
                    image={"http://127.0.0.1:8000/storage/" + item.image}
                    id={item.id}
                    is_ordered={item.is_ordered}
                    new_price={item.new_price}
                    value={item.discount}
                  />
                ))}
              </List>
              <Box className="w-[50%] flex flex-col gap-10 shadow-md m-1 p-5 h-full rounded-lg">
                <form
                  className="flex Group_form shadow-sm"
                  // onSubmit={handelSearch}
                >
                  <select
                    className="input_copon"
                    defaultValue={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="" disabled selected >
                     <p className="text-gray-500"> Update Address </p>
                    </option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="submit"
                    variant="contained"
                    className="bg-orange-400 font-medium text-base rounded-3xl btn h-10"
                    style={{ textTransform: "none" }}
                  >
                    Update
                  </Button>
                </form>
                <form
                  className="flex Group_form shadow-sm"
                  // onSubmit={handelSearch}
                >
                  <input
                    className="input_copon"
                    // value={Search.toUpperCase()}
                    // onChange={(e) => SetSearch(e.target.value.toUpperCase())}
                    type="number"
                    placeholder="Update Phone .."
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    className="bg-orange-400 font-medium  text-base  rounded-3xl btn  h-10    "
                    style={{ textTransform: "none" }}
                  >
                    update
                  </Button>
                </form>
                <Button
                  variant="contained"
                  className=" justify-between bg-orange-400 font-medium   rounded-2xl  h-14 px-5 "
                  sx={{ textTransform: "none" }}
                  onClick={handleopen}
                >
                  <Typography fontSize={20}>Total : {total}.00 DA </Typography>
                  <Typography fontSize={20}>Checkout</Typography>
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <div className="flex justify-center items-center self-center size-[90vh]">
            <img src={cartphoto} className="opacity-75" />
          </div>
        )}
      </Container>
      <Backdrop
        open={open}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box className="lg:w-[40vw] md:w-[55%]  sm:w-[90%] bg-white rounded-lg p-5 flex flex-col justify-between">
          <div className="flex justify-end w-[100%] text-black mb-5">
            <HighlightOffRoundedIcon
              className="cursor-pointer"
              onClick={handleclose}
            />
          </div>
          <List>
            {carts.map((item, index) => (
              <>
                {item.is_ordered == 0 && (
                  <Box key={item.id} className="flex items-center mb-5">
                    <input
                      type="checkbox"
                      id={item.id}
                      className="h-5 w-5 me-5"
                      onChange={handleorderlist}
                    ></input>
                    <Box className="flex justify-between w-[100%] items-center">
                      <img
                        src={"http://127.0.0.1:8000/storage/" + item.image}
                        className="w-20 rounded-lg"
                      />
                      <Typography
                        color={"black"}
                        className="w-[70%] flex justify-between "
                      >
                        <p>{item.name}</p>
                        <p>qte : {item.qte}</p>
                        <p>
                          {item.new_price
                            ? item.new_price * item.qte
                            : item.price * item.qte}
                          .00 DA
                        </p>
                      </Typography>
                    </Box>
                  </Box>
                )}
              </>
            ))}
          </List>

          <Box className="self-end flex gap-5">
            <Button
              onClick={handleorder}
              variant="contained"
              className="bg-orange-400 rounded-full"
            >
              Order
            </Button>
          </Box>
        </Box>
      </Backdrop>
    </>
  );
}

export default Cart;
