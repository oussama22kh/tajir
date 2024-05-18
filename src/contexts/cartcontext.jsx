import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

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
  const setorder = async (cartid) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/order/order",
        { cart_id: cartid },
        config
      );
      if (response.status === 201) {
        console.log(response.data);
        getCarts();
      }
    } catch (error) {
      console.log(error);
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
