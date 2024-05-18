import { Navigate } from "react-router-dom";
import Profile from "../Profile.jsx";
import { useUser } from "../contexts/usercontext.jsx";
import { SellerProvider } from "../contexts/sellercontext.jsx";
import { useEffect } from "react";
export default function AuthProvider() {
  const { user, setreload } = useUser();
 
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
        <Navigate to="/login" />
      )}
    </>
  );
}
