import { Navigate} from "react-router-dom";
import Profile from "../Profile.jsx";
import { useUser } from "../contexts/usercontext.jsx";
export default function AuthProvider() {
  const { user } = useUser();
  return <>{user ? <Profile /> : <Navigate to="/login" />}</>;
}