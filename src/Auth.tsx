import React, { useContext, useEffect, useState } from "react";
import { hasAccessAuth, removeAccessToken, setAccessToken } from "./atoms";

// auth
export const AuthContext = React.createContext({
  auth: true,
  login: (access_token: string) => {},
  logout: () => {},
});

interface iAuthParam {
  children: React.ReactElement;
}

export const AuthProvider = ({ children }: iAuthParam) => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (hasAccessAuth()) {
      setAuth(true);
    }
  }, []);

  const login = (access_token: string) => {
    setAccessToken(access_token);
    setAuth(true);
  };

  const logout = () => {
    removeAccessToken();
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
