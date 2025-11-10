import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { getApiUrl } from "../config/api.js";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const Cartprovider = ({ children }) => {
  const [token, settoken] = useState(Cookies.get("token"));
  const [carts, setCarts] = useState([]);
  const [total, settotal] = useState(0);
  const [loading, setloading] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    settoken(Cookies.get("token"));
    getCarts();
  }, [loading]);
  useEffect(() => {
    getTotal();
  }, [carts]);

  const getCarts = async () => {
    const apiUrl = getApiUrl("api/cart/getCarts");
    try {
      const response = await axios.get(apiUrl, config);
      if (response.status == 200) {
        setCarts(response.data.Carts);
        console.log(response.data.Carts);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getTotal = () => {
    let totalprice = 0;
    carts.forEach((cart) => {
      if (cart.is_validate == 0 && cart.is_ordered == 0) {
        totalprice += cart.price * cart.qte;
      }
    });
    settotal(totalprice);
  };

  const deletecartitem = async (id) => {
    const apiUrl = getApiUrl(`api/cart/deleteCart/${id}`);

    try {
      const response = await axios.delete(apiUrl, config);
      if (response.status == 200) {
        toast.success("success", response.data);
        setloading(!loading);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updatecart = async (id, qte) => {
    const apiUrl = getApiUrl("api/cart/updateCart");

    try {
      const response = await axios.post(apiUrl, { id: id, qte: qte }, config);
      if (response.status == 200) {
        setloading(!loading);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const setorder = async (cartid) => {
    try {
      const response = await axios.post(
        getApiUrl("api/order/order"),
        { cart_id: cartid },
        config
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        getCarts();
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };
  return (
    <CartContext.Provider
      value={{
        carts,
        deletecartitem,
        total,
        setloading,
        loading,
        updatecart,
        setorder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
