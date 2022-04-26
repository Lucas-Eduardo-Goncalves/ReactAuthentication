import { Route, Routes as ReactRouterRoutes } from "react-router-dom";

import { SignIn } from "../pages/SignIn";
import { Dashboard } from "../pages/Dashboard";

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route element={<SignIn />} path="/" />
      <Route element={<Dashboard />} path="/home" />
    </ReactRouterRoutes>
  )
}