import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";

import { SignIn } from "../pages/SignIn";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export function Router() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [cookies] = useCookies(["meuSitecom-token"]);

  const token = cookies["meuSitecom-token"];
  const lastRoute = localStorage.getItem("meuSitecom-lastRoute");

  useEffect(() => {
    if (location.pathname === "/" && token) {
      if (lastRoute) navigate(lastRoute)
    }
  }, [])

  useEffect(() => {
    if (location.pathname !== "/") {
      localStorage.setItem("meuSitecom-lastRoute", location.pathname);
    }

    if(location.pathname === "/" && token && lastRoute) {
      navigate(lastRoute)
    }
  }, [location])

  return (
    <Routes>
      <Route element={<SignIn />} path="/" />

      <Route element={<PrivateRoute><Dashboard/></PrivateRoute>} path="/dashboard" />  
      <Route element={<PrivateRoute><Home/></PrivateRoute>} path="/home" />     
    </Routes>
  )
}