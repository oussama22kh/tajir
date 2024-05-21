import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
const SellerContext = createContext();

export const useSeller = () => useContext(SellerContext);

export const SellerProvider = ({ children }) => {
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [product, setproduct] = useState({});
  const [loading, setlaoding] = useState(false);
  const [openproduct, setOpenproduct] = useState(false);
  const [orders, setorders] = useState([]);

  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    getproducts();
    getcategories();
    getorders();
  }, [loading]);

  const getproducts = async () => {
    const apiurl = "http://127.0.0.1:8000/api/seller/stock/";
    try {
      const response = await axios.get(apiurl, config);
      if (response.status === 200) {
        setproducts(response.data.stocks);
        console.log(response.data.stocks);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
      } else {
        console.log("An error occurred:", error);
      }
    }
  };
  const getproduct = async (id) => {
    const apiurl = "http://127.0.0.1:8000/api/seller/stock/" + id;
    try {
      const response = await axios.get(apiurl, config);
      if (response.status === 200) {
        setproduct(response.data.stock);
        console.log(response.data.stock);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
      } else {
        console.log("An error occurred:", error);
      }
    }
  };

  const deleteproduct = async (id) => {
    const apiurl = "http://127.0.0.1:8000/api/product/deleteProduct/" + id;
    setlaoding(!loading);
    try {
      const response = await axios.delete(apiurl, config);
      if (response.status === 200) {
        console.log("Deleted succesfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
      } else {
        console.log("An error occurred:", error);
      }
    }
  };
  const getcategories = async () => {
    const apiurl = "http://127.0.0.1:8000/api/categories";
    try {
      const response = await axios.get(apiurl);
      if (response.status === 200) {
        setcategories(response.data.categories);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
      } else {
        console.log("An error occurred:", error);
      }
    }
  };

  const getorders = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/order/sellerOrders",
        config
      );
      if (response.status === 200) {
        setorders(response.data.orders);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const addproduct = async (formData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/product/storeProduct",
        formData,
        config
      );

      if (response.status === 201) {
        toast.success("Product added Successfully");
        setlaoding(!loading);
      }
    } catch (error) {
      
      toast.error(error);
    }
  };
  return (
    <SellerContext.Provider
      value={{
        products,
        getproduct,
        product,
        openproduct,
        setOpenproduct,
        setproduct,
        deleteproduct,
        categories,
        orders,
        addproduct,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};
