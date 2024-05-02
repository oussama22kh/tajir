import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./login.jsx";
import Signup from "./Signup.jsx";
import Profile from "./Profile.jsx";
import ErrorPage from "./Errorpage.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductUpdate from "./ProductForm.jsx";
import Cart from "./Component/Cart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/cart/",
    element: <Cart />,
  },
  {
    path: "/login/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup/",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product/",
    element: <ProductUpdate />,
  },
  {
    path: "/profile/",
    element: <Profile />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
