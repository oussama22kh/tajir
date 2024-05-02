import * as React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CloseIcon from "@mui/icons-material/Close";

const Drawer = MuiDrawer;

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [dwidth, setdwidth] = useState("50px"); // Initially closed

  const handleToggleDrawer = () => {
    setOpen(!open);
    if (open) {
      setdwidth("50px");
    } else {
      setdwidth("240px");
    } // Toggle open/close state
  };

  return (
    <div className="fixed left-0 h-full bg-blue-500">
      <Drawer variant="permanent" open={open}>
        <div className="p-2" style={{ width: dwidth }}>
          <div
            onClick={handleToggleDrawer} // Clicking list icon toggles the sidebar
            className="flex justify-between items-center mb-5 cursor-pointer relative"
          >
            <div className="mr-2 absolute right-0 top-2">
              {open ? (
                <CloseIcon style={{ color: "black" }} />
              ) : (
                <FormatListBulletedIcon style={{ color: "black" }} />
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
