import { ReactNode } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import {
  logOut,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TUser } from "../../types/authSlice";
import verifyToken from "../../utils/verifyToken";

interface TProtectedRouteProps {
  children: ReactNode;
  role: string;
}

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const token: string | null = useAppSelector(selectCurrentToken);

  let user: TUser | null;

  if (token) {
    user = verifyToken(token);
  } else {
    user = null;
  }

  const dispatch = useAppDispatch();
  if (role !== user?.role) {
    toast.error("You are not authorized to access this route.");
    dispatch(logOut());
    return <Navigate to={"/login"} replace />;
  }
  if (!token) {
    toast.error("Login please...");
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectedRoute;
