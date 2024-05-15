import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setloading] = useState(false);
  const [redirect, setredirect] = useState(false);
  const navigateto = useNavigate();
  const apiUrl = "http://127.0.0.1:8000/api/profile";
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    getuser();
  }, [loading]);

  const getuser = async () => {
    try {
      const response = await axios.get(apiUrl, config);
      if (response.status == 200) {
        setUser(response.data.buyer);
        console.log(response.data.buyer);
      }
    } catch (error) {
      console.error(error);
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
          console.log(response.data);
          getuser();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setloading(!loading);
  };

  const logout = async () => {
    try {
      const reaponse = await axios.get(
        "http://127.0.0.1:8000/api/profile/logout",
        config
      );
      if (reaponse.status === 200) {
        console.log("logged out");
        Cookies.remove("token");
        setUser(undefined);
        navigateto("/");
      }
    } catch (error) {
      console.error(error);
    }
    setloading(!loading);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
