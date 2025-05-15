import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // adjust path if needed

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
