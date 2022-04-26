import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { api } from "../services/api";

interface UserProps {
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface signInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: signInCredentials) => Promise<void>;
  isAuthenticated: boolean;
  user: UserProps | undefined;
}

export const AuthContext = createContext({} as AuthContextData); 

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>();
  const isAuthenticated = !!user;
  
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["meuSitecom-token"]);

  useEffect(() => { 
    const token = cookies["meuSitecom-token"];
    if(token) {
      api.defaults.headers.common['authorization'] = `Bearer ${JSON.parse(token)}`;
      setUser({ email: "eng.franciscodias@gmail.com" });
    }
  }, [])

  async function signIn({ email, password }: signInCredentials) {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      
      api.defaults.headers.common['authorization'] = `Bearer ${token}`;

      setCookie("meuSitecom-token", JSON.stringify(token), { 
        expires: new Date(Date.now() + 10 * 1000)
      });

      setUser({ email });
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}