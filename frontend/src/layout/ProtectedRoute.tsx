import { AuthViewModel } from "@/viewModels/AuthViewModel";
import { Navigate } from "react-router-dom";
import { Routes } from "@/constants/routes";
import { PropsWithChildren } from "react";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = AuthViewModel.Instance;

  if (!isLoggedIn) {
    return <Navigate to={Routes.Home} />;
  }

  return children;
};
