import { Navigate } from "react-router-dom";
import { useAuth } from "../Components/useAuth";

export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};