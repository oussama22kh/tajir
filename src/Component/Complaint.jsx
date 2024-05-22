import {
  Box,
  Container,
  List,
  Typography,
  IconButton,
  Backdrop,
} from "@mui/material";
import { useUser } from "../contexts/usercontext";
import { useState } from "react";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

export default function Complaint() {
  const { report, setreport } = useUser();

  const handleclose = () => {
    setreport(false);
  };
  return (
    <>
      <Backdrop
        open={report}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box maxWidth="lg" className="bg-white w-[50%] h-[90%] rounded-2xl ">
          <HighlightOffRoundedIcon
            className="cursor-pointer"
            onClick={handleclose}
            
          />
          <Typography variant="h4" className="text-black mx-6 ">
            Reports
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
}
