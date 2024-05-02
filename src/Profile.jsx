import {
  Button,
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Checkbox,
  Menu,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  Backdrop,
  List,
  Breadcrumbs,
  Drawer,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";
import Sidebar from "./Component/Sidebar.jsx";
import { useState } from "react";
export default function Profile() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <Sidebar></Sidebar>
    </>
  );
}
