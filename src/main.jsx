import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./login.jsx";
import Signup from "./Signup.jsx";
import ErrorPage from "./Errorpage.jsx";
import History from "./Component/History.jsx";
import "./index.css";
import Cookies from "js-cookie";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Cart from "./Component/Cart.jsx";
import Orders from "./Component/Orders.jsx";
import Edit from "./Component/Edit.jsx";
import Joinus from "./Component/Joinus.jsx";
import Mystore from "./Component/Mystore.jsx";
import Profiledetail from "./Component/Profiledetail.jsx";
import { Toaster } from "react-hot-toast";
import Feedback from "./Component/Feedback.jsx";
import AuthProvider from "./Component/AuthProvider.jsx";
import { Cartprovider } from "./contexts/cartcontext";
import { UserProvider } from "./contexts/usercontext.jsx";
import { SellerProvider } from "./contexts/sellercontext.jsx";
import Profile from "./Profile.jsx";
import Discount from "./Component/Discount.jsx";
import Alert from "./Component/Alert.jsx";
const token = Cookies.get("token");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </React.StrictMode>
);

function Home() {
  return (
    <UserProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Cartprovider>
              <App />
            </Cartprovider>
          }
        />

        <Route
          path="cart"
          element={
            <Cartprovider>
              <Cart />
            </Cartprovider>
          }
        />
        <Route path="/notification" element={<Alert />} />
        <Route path="/test" element={<Discount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<AuthProvider />}>
          <Route path="/profile" element={<Profiledetail />} />
          <Route path="history" element={<History />} />
          <Route path="edit" element={<Edit />} />
          <Route path="mystore" element={<Mystore />} />
          <Route path="order" element={<Orders />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
        <Route path="joinus" element={<Joinus />} />
      </Routes>
      <Toaster></Toaster>
    </UserProvider>
  );
}
