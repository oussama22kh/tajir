import { Button, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

import { NavLink } from "react-router-dom";
export default function Sidebaritem({ open, items }) {
  return (
    <>
      {open ? (
        <div className=" py-5 gap-2 flex flex-col ">
          {items.map((item, index) => (
            <NavLink to={item.path} key={index}>
              <Box className="flex items-center cursor-pointer">
                <IconButton className="mx-5 hover:bg-transparent ">
                  {item.icon}
                </IconButton>
                <Typography>{item.name}</Typography>
              </Box>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className=" py-5 gap-2 flex flex-col items-center ">
          {items.map((item, index) => (
            <Box key={index} className="flex items-center ">
              <NavLink to={item.path}>
                <IconButton>{item.icon}</IconButton>
              </NavLink>
              <Typography className="hidden">{item.name}</Typography>
            </Box>
          ))}
        </div>
      )}
    </>
  );
}
