import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setloading] = useState(false);
  const [redirect, setredirect] = useState(false);
  const [orderhistory, setorderhistory] = useState([]);
  const [reload, setreload] = useState(false);
  const [brandlist, setbrandlist] = useState([]);
  const navigateto = useNavigate();
  const [reviews, setreviews] = useState([]);
  const [seller, setseller] = useState();
  const [alerts, setalerts] = useState([]);
  const [report, setreport] = useState(false);
  const apiUrl = "http://127.0.0.1:8000/api/profile";
  const token = Cookies?.get("token") || null;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (token) {
      getuser();
      getorderhistory();
      getnotifications();
    }
  }, [loading]);

  const getuser = async () => {
    try {
      const response = await axios.get(apiUrl, config);
      if (response.status === 200) {
        setUser(response.data.buyer);
      }
    } catch (error) {
      if (error.status === 408)
        toast.error(
          "There was an error getting your data check your intenet connection"
        );
    } finally {
      setreload(false);
    }
  };
  const updateProfile = async (formData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/profile/update",
        formData,
        config
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setUser(response.data.buyer);
        setloading(!loading);
      }
    } catch (err) {
      toast.error(err.message);
      setloading(!loading);
    }
  };
  const updateimage = async (formData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/profile/updateImage",
        formData,
        config
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setloading(!loading);
      }
    } catch (err) {
      toast.error(err.message);
      setloading(!loading);
    }
  };

  const login = async (data) => {
    const response = await axios
      .post("http://127.0.0.1:8000/api/login", data)
      .then((response) => {
        if (response.status === 200) {
          Cookies.set("token", response.data.token, {
            expires: 7,
          });
          getuser();
          toast.success("logged in");
          navigateto("/profile");
        }
      })
      .catch((error) => {
        toast.error("there was an error");
      })
      .finally(() => {
        setloading(!loading);
      });
  };

  const logout = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/profile/logout",
        config
      );
      if (response.status === 200) {
        console.log("logged out");
        Cookies.remove("token");
        setUser(undefined);
        setreload(false);
        navigateto("/");
      }
    } catch (error) {
      console.error(error);
      setreload(false);
    }
    setloading(!loading);
  };
  const getorderhistory = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/order/hisOrders",
        config
      );
      if (response.status === 200) {
        setorderhistory(response.data.orders);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const signup = async (formData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData
      );
      if (response.status === 201) {
        Cookies.set("token", response.data.token, { expires: 7 });
        navigateto("/profile");
        toast.success("Your account was created successfully");
      }
    } catch (error) {
      toast.error("Account creation failed");
    }
  };
  const getbrandlist = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/brand/getBrands"
      );
      if (response.status == 200) {
        setbrandlist(response.data.brands);
      }
    } catch (error) {
      toast.error("Failed to fetch brands list");
    }
  };
  const addbrand = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/brand/store",
        data,
        config
      );
      if (response.status == 201) {
        toast.success("Brand created");
        navigateto("/");
      }
    } catch (error) {
      if (error.data.message === "'Buyer is already a seller'") {
        toast.error(
          "Failed to add you to the brand becouse you already did that"
        );
      } else {
        toast.error("Failed to add you to the brand try again");
      }
    }
  };
  const joinbrand = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/profile/updateRole",
        data,
        config
      );
      if (response.status == 201) {
        setbrandlist(response.data.brands);
        navigateto("/profile");
      }
    } catch (error) {
      if (error.data.message === "'Buyer is already a seller'") {
        toast.error(
          "Failed to add you to the brand becouse you already did that"
        );
      } else {
        toast.error("Failed to add you to the brand try again");
      }
    }
  };
  const getseller = async (id) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/seller/showSeller/" + id
      );
      if (response.status == 200) {
        setseller(response.data.seller);
      }
    } catch (error) {
      toast.error("Failed to fetch seller information");
    }
  };

  const createReview = async (product_id, content, rating) => {
    const url = `http://127.0.0.1:8000/api/review/${product_id}`;
    const data = {
      rating: rating,
      content: content,
    };
    try {
      const response = await axios.post(url, data, config);
      if (response.status === 201) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(
        "Error creating review:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const getAllReviewsByProduct = async (product_id) => {
    const url = `http://127.0.0.1:8000/api/review/${product_id}`;
    try {
      const response = await axios.get(url, config);
      if (response.status === 200) {
        console.log(response.data.reviews);
        setreviews(response.data.reviews);
      }
    } catch (error) {
      console.error(
        "Error fetching reviews:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const getnotifications = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/profile/notification",
        config
      );
      if (response.status == 200) {
        console.log(response.data.Notification);
        setalerts(response.data.Notification);
      }
    } catch (error) {
      console.log(error.response.message);
    }
  };
  const deletealert = async (notification_id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/profile/notification/${notification_id}`,
        {},
        config
      );
      if (response.status == 200) {
        setloading(!loading);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        setloading,
        redirect,
        setredirect,
        navigateto,
        orderhistory,
        reload,
        setreload,
        signup,
        updateimage,
        getbrandlist,
        brandlist,
        addbrand,
        joinbrand,
        getseller,
        seller,
        updateProfile,
        createReview,
        reviews,
        getAllReviewsByProduct,
        alerts,
        deletealert,
        setreport,
        report,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
