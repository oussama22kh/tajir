import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./login.jsx";
import Signup from "./Signup.jsx";
import ErrorPage from "./Errorpage.jsx";
import History from "./Component/History.jsx";
import "./index.css";
import Cookies from "js-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductUpdate from "./ProductForm.jsx";
import Cart from "./Component/Cart.jsx";
import Edit from "./Component/Edit.jsx";
import Joinus from "./Component/Joinus.jsx";
import Feedback from "./Component/Feedback.jsx";
import AuthProvider from "./Component/AuthProvider.jsx";
const token = Cookies.get("token");
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
    element: (
      <AuthProvider token={token}>
      </AuthProvider>
    ),
    children: [
      { path: "history", element: <History /> },
      { path: "edit", element: <Edit /> },
      { path: "joinus", element: <Joinus /> },
      { path: "feedback", element: <Feedback /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
