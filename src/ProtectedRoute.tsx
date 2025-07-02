// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { notifyError } from "./utils/toast-messages";

interface IProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const storedUser = localStorage.getItem("User");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

