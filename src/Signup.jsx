import { Link } from "react-router-dom";
import { Button, Box, Typography, TextField, Container } from "@mui/material";
import { useState } from "react";
import photo from "./assets/signup.svg";
import logo from "./assets/logo.svg";
import { useUser } from "./contexts/usercontext";

function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

  const { signup } = useUser();

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setIsValidEmail(email.includes("@") && email.includes("."));
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    setIsValidPassword(password.length >= 8);
    setIsValidConfirmPassword(password === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    setIsValidConfirmPassword(confirmPassword === password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValidEmail && isValidPassword && isValidConfirmPassword) {
      const formData = new FormData();
      formData.append("username", firstName + lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", confirmPassword);
      signup(formData);
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
                  ✔ Get more revenue <br />
                  ✔ Expand your Business <br />✔ Exceed client expectations
                </Typography>
              </Box>
              <img src={photo} alt="Happy customer " className="p-10" />
            </Box>
          </Box>
          <Box className="bg-white rounded-xl shadow-lg w-[50%] p-16 h-full">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center h-full  gap-10"
            >
              <Typography className="text-5xl font-medium">Sign up</Typography>
              <Typography>
                Already have an account?
                <Link to={"/login"} className="p-2 underline text-orange-600">
                  Login
                </Link>
              </Typography>

              <Box className="flex gap-5">
                <TextField
                  fullWidth
                  label="First name"
                  variant="outlined"
                  id="firstname"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  InputProps={{ sx: { borderRadius: 3 } }}
                ></TextField>
                <TextField
                  fullWidth
                  label="Last name"
                  variant="outlined"
                  id="lastname"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  InputProps={{ sx: { borderRadius: 3 } }}
                ></TextField>
              </Box>
              <TextField
                required
                fullWidth
                label="Email address"
                variant="outlined"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                error={!isValidEmail}
                helperText={!isValidEmail && "Please enter a valid email"}
                InputProps={{ sx: { borderRadius: 3 } }}
              />
              <TextField
                required
                fullWidth
                label="Password (8+ characters)"
                variant="outlined"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                error={!isValidPassword}
                helperText={
                  !isValidPassword &&
                  "Password must be at least 8 characters long"
                }
                InputProps={{ sx: { borderRadius: 3 } }}
              />
              <TextField
                fullWidth
                required
                label="Confirm password"
                name="password_confirmation"
                variant="outlined"
                type="password"
                id="confirmp"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={!isValidConfirmPassword}
                helperText={!isValidConfirmPassword && "Passwords do not match"}
                InputProps={{ sx: { borderRadius: 3 } }}
              />

              <Button
                variant="contained"
                className="bg-orange-400 font-medium  text-lg rounded-full w-72 h-12"
                style={{ textTransform: "none" }}
                type="submit"
              >
                Create an account
              </Button>
            </form>
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
