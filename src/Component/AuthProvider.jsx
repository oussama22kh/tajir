import { Navigate } from "react-router-dom";
import Profile from "../Profile.jsx";
import { useUser } from "../contexts/usercontext.jsx";
import { SellerProvider } from "../contexts/sellercontext.jsx";
import { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
export default function AuthProvider() {
  const { user, setreload } = useUser();
  const [fakeload, setfakeload] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setfakeload(false);
    }, 2000);
  }, []);
  return (
    <>
      {user ? (
        <>
          {user.role == 0 ? (
            <Profile />
          ) : (
            <SellerProvider>
              <Profile />
            </SellerProvider>
          )}
        </>
      ) : (
        <>
          {fakeload ? (
            <Box className="w-full h-screen flex justify-center items-center">
              <CircularProgress  className="text-orange-400"/>
            </Box>
          ) : (
            <Navigate to="/login" />
          )}
        </>
      )}
    </>
  );
}
