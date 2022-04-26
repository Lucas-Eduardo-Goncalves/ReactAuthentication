import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Router } from "./router";

export function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  )
}