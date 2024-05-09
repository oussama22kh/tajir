import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const token = Cookies.get("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const Cartprovider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [total, settotal] = useState(0);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getCarts();
  }, [loading]);
  useEffect(() => {
    getTotal();
  }, [carts]);
  const getCarts = async () => {
    const apiUrl = "http://127.0.0.1:8000/api/cart/getCarts";
    try {
      const response = await axios.get(apiUrl, config);
      if (response.status == 200) {
        setCarts(response.data.Carts);
        console.log(carts);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getTotal = () => {
    let totalprice = 0;
    carts.forEach((cart) => {
      totalprice += cart.price * cart.qte;
    });
    settotal(totalprice);
  };

  const deletecartitem = async (id) => {
    const apiUrl = "http://127.0.0.1:8000/api/cart/deleteCart/" + id;

    try {
      const response = await axios.delete(apiUrl, config);
      if (response.status == 200) {
        console.log("success", response.data);
        setloading(!loading);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updatecart = async (id, qte) => {
    const apiUrl = "http://127.0.0.1:8000/api/cart/updateCart";

    try {
      const response = await axios.post(apiUrl, { id: id, qte: qte }, config);
      if (response.status == 200) {
        console.log("success", response.data);
        setloading(!loading);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CartContext.Provider
      value={{ carts, deletecartitem, total, setloading, loading, updatecart }}
    >
      {children}
    </CartContext.Provider>
  );
};
