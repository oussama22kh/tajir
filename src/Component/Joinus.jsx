import {
  Button,
  Box,
  Typography,
  TextField,
  Container,
  InputBase,
  Menu,
  MenuItem,
  Popper,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import brand from "../assets/brand.svg";
import { useEffect, useState } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import { useUser } from "../contexts/usercontext";
import toast from "react-hot-toast";
export default function Joinus() {
  const [file, setfile] = useState("");
  const [brandlogo, setbrandlogo] = useState("");
  const [cover, setcover] = useState("");
  const [filename, setfilename] = useState("");
  const [brandlogoname, setbrandlogoname] = useState("");
  const [covername, setcovername] = useState("");
  const [searchlist, setsearchlist] = useState([]);
  const { brandlist, getbrandlist, addbrand, joinbrand } = useUser();
  const [anchorEl, setAnchorEl] = useState();
  const [brandname, setbrandname] = useState("");
  const [brandid, setbrandid] = useState("");
  const open = Boolean(anchorEl);
  const formData = new FormData();
  const [hideLabels, setHideLabels] = useState(false);
  useEffect(() => {
    getbrandlist();
  }, []);
  const handlefilechange = (e) => {
    let filename = e.target.files[0].name;
    if (filename.length > 30) {
      filename = filename.slice(0, 25) + "... .pdf";
      setfilename(filename);
    } else {
      setfilename(filename);
    }
    setfile(e.target.files[0]);
  };

  const handlelogochange = (e) => {
    let filename = e.target.files[0].name;
    if (filename.length > 30) {
      filename = filename.slice(0, 25) + "...";
      setbrandlogoname(filename);
    } else {
      setbrandlogoname(filename);
    }
    setbrandlogo(e.target.files[0]);
  };
  const handlecoverchange = (e) => {
    let filename = e.target.files[0].name;
    if (filename.length > 30) {
      filename = filename.slice(0, 25) + "...";
      setcovername(filename);
    } else {
      setcovername(filename);
    }
    setcover(e.target.files[0]);
  };
  const searchbrand = (e) => {
    setsearchlist(
      brandlist.filter((item) => item.name.includes(e.target.value))
    );
    setbrandname(e.target.value);
    if (e.target.value.length > 1) {
      setAnchorEl(e.currentTarget);
    } else {
      setAnchorEl(null);
    }
    setHideLabels(false);
  };
  const handleClose = (item) => {
    setbrandname(item.name);
    setbrandid(item.id);
    setAnchorEl(null);
    setHideLabels(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append("commercialRecord", file);
    if (!hideLabels) {
      formData.append("name", brandname);
      formData.append("background_image", cover);
      formData.append("logo", brandlogo);
      addbrand(formData);
    } else {
      formData.append("brand_id", brandid);
      joinbrand(formData);
    }
  };

  return (
    <>
      <Link to={"/"}>
        <Box className="flex items-center m-5 cursor-pointer">
          <img src={logo} alt="Tajir" />
          <Typography
            className="text-4xl font-semibold text-slate-800 font-tajir px-2"
            id="logo"
          >
            Tajir
          </Typography>
        </Box>
      </Link>
      <Container maxWidth="lg">
        <Box className="flex gap-20 items-center">
          <Box className="w-[50%] max-sm:p-3 ">
            <Box className="w-full flex flex-col  gap-10">
              <Box className="flex flex-col items-center gap-5">
                <Typography className=" font-semibold text-4xl text-orange-600">
                  Build your brand
                </Typography>
                <Typography className=" font-medium">
                  ✔ Get more revnue <br />
                  ✔ Expand your Business <br />✔ Exceed client expectations
                </Typography>
              </Box>
              <img src={brand} alt="Happy customer " className="p-5" />
            </Box>
          </Box>
          <Box
            className="bg-white  flex  flex-col items-center justify-around rounded-xl shadow-lg w-[50%] max-sm:p-3 gap-10 h-full "
            p={8}
          >
            <Typography className="text-5xl font-medium">
              Start Selling
            </Typography>
            <form
              className="h-full w-full flex  flex-col items-center justify-around gap-10 "
              onSubmit={handleSubmit}
            >
              <TextField
                fullWidth
                label="Search Brands*"
                variant="outlined"
                InputProps={{ sx: { borderRadius: 3 } }}
                onChange={searchbrand}
                id="search"
                value={brandname ? brandname : ""}
              ></TextField>

              <Popper
                id="brand-popper"
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start"
                className="bg-white"
              >
                {searchlist.map((item) => (
                  <MenuItem
                    key={item.id}
                    onClick={() => {
                      handleClose(item);
                    }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Popper>

              <label
                htmlFor="file_input"
                className="h-14 border w-full active:border-black hover:border-black rounded-xl px-3 flex items-center justify-between text-gray-500 overflow-hidden"
              >
                <Typography className="w-[90%]">
                  {filename ? filename : "Commercial Record"}
                </Typography>
                <AttachFileRoundedIcon />
              </label>
              <input
                className="hidden h-14 "
                id="file_input"
                type="file"
                accept="application/pdf"
                onChange={handlefilechange}
                required
              />
              {!hideLabels && (
                <>
                  <label
                    id="logolabel"
                    htmlFor="brandlogo"
                    className="h-14 border w-full active:border-black hover:border-black rounded-xl px-3 flex items-center justify-between text-gray-500 overflow-hidden"
                  >
                    <Typography className="w-[90%]">
                      {brandlogoname ? brandlogoname : "Brand Logo"}
                    </Typography>
                    <AddPhotoAlternateOutlinedIcon />
                  </label>
                  <input
                    className="hidden h-14 "
                    id="brandlogo"
                    type="file"
                    onChange={handlelogochange}
                    accept="image/*"
                  />
                  <label
                    id="coverlabel"
                    htmlFor="cover"
                    className="h-14 border w-full active:border-black hover:border-black rounded-xl px-3 flex items-center justify-between text-gray-500 overflow-hidden"
                  >
                    <Typography className="w-[90%]">
                      {covername ? covername : "Brand Cover"}
                    </Typography>
                    <AddPhotoAlternateOutlinedIcon />
                  </label>
                  <input
                    className="hidden h-14 "
                    id="cover"
                    type="file"
                    onChange={handlecoverchange}
                    accept="image/*"
                  />
                </>
              )}
              <Button
                variant="contained"
                className="bg-orange-400 font-medium  text-lg rounded-full w-72 h-12"
                style={{ textTransform: "none" }}
                type="submit"
              >
                Continue
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
}
