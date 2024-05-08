import { Link } from "react-router-dom";
import { Button, Box, Typography, TextField, Container } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import photo from "./assets/signup.svg";
import logo from "./assets/logo.svg";
import Cookies from "js-cookie";
import { useUser } from "./contexts/usercontext";
import axios from "axios";

function Signup() {
  const [email, setemail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setdate] = useState();
  const [validemail, setvalidemail] = useState(true);
  const [validepassword, setvalidepassword] = useState(true);
  const [confirm, setconfirm] = useState("");
  const [validconfirm, setvalidconfirm] = useState(true);
  const [phone, setphone] = useState("");
  const [validphone, setvalidphone] = useState(true);

  const { navigateto } = useUser();
  const handlechange = () => {
    if (email.length == 0) {
      setvalidemail(true);
    }
    if (password.length == 0) {
      setvalidepassword(true);
    } else if (password.length < 8) {
      setvalidepassword(false);
    } else {
      setvalidepassword(true);
    }
    if (confirmPassword == password) {
      setvalidconfirm(true);
    } else {
      setvalidconfirm(false);
    }
  };
  const handledatechange = (value) => {
    setdate(value.$M + 1 + "-" + value.$D + "-" + value.$y);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    handlechange();
    if (validemail && validepassword && validconfirm) {
      const formData = new FormData();
      formData.append("username", firstName + lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", confirmPassword);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData
      );
      if (response.status === 201) {
        Cookies.set("token", response.data.token, { expires: 7 });
        navigateto("/profile");
      } else {
        alert(response.status);
      }
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
        <Box className="flex">
          <Box className="w-[50%] max-sm:p-3 h-full">
            <Box className="w-full h-full flex flex-col items-center ">
              <Box className=" flex flex-col ">
                {" "}
                <Typography className=" pt-10 font-medium">
                  Get the Seller's Account
                </Typography>
                <Typography className=" pb-5 font-bold text-6xl text-orange-400">
                  Starting <br />
                  Today!
                </Typography>
                <Typography className=" font-semibold text-4xl text-orange-600">
                  Build your brand
                </Typography>
                <Typography className=" font-medium">
                  ✔ Get more revnue <br />
                  ✔ Expand your Business <br />✔ Exceed client expectations
                </Typography>
              </Box>
              <img src={photo} alt="Happy customer " className="p-10" />
            </Box>
          </Box>
          <Box
            className="bg-white  flex  flex-col items-center justify-around rounded-xl shadow-lg w-[50%] max-sm:p-3 gap-10 "
            p={8}
          >
            <Typography className="text-5xl font-medium">Sign up</Typography>
            <Typography>
              Already have have an account ?
              <Link to={"/login"} className="p-2 underline text-orange-600">
                Login
              </Link>
            </Typography>

            <TextField
              fullWidth
              label="First name*"
              variant="outlined"
              id="firstname"
              onChange={(e) => setFirstName(e.target.value)}
              InputProps={{ sx: { borderRadius: 3 } }}
            ></TextField>
            <TextField
              fullWidth
              label="Last name*"
              variant="outlined"
              id="lastname"
              onChange={(e) => setLastName(e.target.value)}
              InputProps={{ sx: { borderRadius: 3 } }}
            ></TextField>

            {validemail ? (
              <TextField
                fullWidth
                label="Email address*"
                variant="outlined"
                id="email"
                name="email"
                onChange={(e) => setemail(e.target.value)}
                InputProps={{ sx: { borderRadius: 3 } }}
              />
            ) : (
              <TextField
                error
                fullWidth
                label="Email address*"
                onChange={(e) => setemail(e.target.value)}
                variant="outlined"
                id="email"
                name="email"
                InputProps={{ sx: { borderRadius: 3 } }}
              ></TextField>
            )}
            {validepassword ? (
              <TextField
                fullWidth
                label="Password (8+ characters)*"
                variant="outlined"
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                name="password"
                id="password"
                InputProps={{ sx: { borderRadius: 3 } }}
              ></TextField>
            ) : (
              <TextField
                error
                fullWidth
                label="Password(8+ characters)*"
                variant="outlined"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setpassword(e.target.value)}
                InputProps={{ sx: { borderRadius: 3 } }}
              ></TextField>
            )}
            {validconfirm ? (
              <TextField
                fullWidth
                label="Confirm password*"
                name="password_confirmation"
                variant="outlined"
                type="password"
                id="confirmp"
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{ sx: { borderRadius: 3 } }}
              ></TextField>
            ) : (
              <TextField
                error
                fullWidth
                label="Confirm password*"
                name="password_confirmation"
                variant="outlined"
                type="password"
                id="confirmp"
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{ sx: { borderRadius: 3 } }}
              ></TextField>
            )}

            <Button
              variant="contained"
              className="bg-orange-400 font-medium  text-lg rounded-full w-72 h-12"
              style={{ textTransform: "none" }}
              onClick={handleSubmit}
            >
              Create an account
            </Button>
          </Box>
        </Box>
      </Container>
      <footer>
        <Box height={50}></Box>
      </footer>
    </>
  );
}

export default Signup;
