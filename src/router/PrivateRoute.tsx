import { ReactNode } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation();
  const [cookies] = useCookies(["meuSitecom-token"]);
  
  const token = cookies["meuSitecom-token"];

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <>
    {children}
    </>
  );
};