import { ReactNode } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token: string | null = useAppSelector(useCurrentToken);
  if (!token) {
    toast.error("Login please...");
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectedRoute;
