import * as React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Button, IconButton, Box, Typography } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../assets/logo.svg";
import Sidebaritem from "./Sidebaritem.jsx";
const Drawer = MuiDrawer;

export default function Sidebar({ items }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
    // Toggle open/close state
  };

  return (
    <div className="fixed left-0 h-full ">
      <Drawer variant="permanent" open={open} className="">
        <div
          className="p-2 "
          style={{
            width: open ? "200px" : "50px",
            transition: "width 0.25s ease-in-out",
          }}
        >
          <div
            onClick={handleToggleDrawer}
            className="flex justify-between items-center mb-20  cursor-pointer relative"
          >
            <div className="mr-2 absolute right-0 top-5">
              {open ? (
                <div className="flex gap-3">
                  <Box className="flex items-center cursor-pointer ">
                    <img src={logo} alt="Tajir" className="h-10" />
                    <Typography
                      className="text-3xl font-semibold text-slate-800 font-tajir px-2 "
                      id="logo"
                    >
                      Tajir
                    </Typography>
                  </Box>
                  <ArrowBackIcon className="hover:bg-[#F8FAFD] rounded-full" />
                </div>
              ) : (
                <FormatListBulletedIcon style={{ color: "black" }} />
              )}
            </div>
          </div>
        </div>
        <Sidebaritem open={open} items={items}></Sidebaritem>
      </Drawer>
    </div>
  );
}
