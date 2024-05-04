import { Navigate, Outlet } from "react-router-dom";
import Profile from "../Profile.jsx";

export default function AuthProvider({ token }) {
  return <>{token ? <Profile /> : <Navigate to="/login" />}</>;
}
