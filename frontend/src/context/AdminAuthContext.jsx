import { createContext, useContext, useMemo, useState } from "react";
import { setAuthToken } from "../services/api";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("paradip_admin_token") || "");

  const login = (newToken) => {
    localStorage.setItem("paradip_admin_token", newToken);
    setAuthToken(newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("paradip_admin_token");
    setAuthToken("");
    setToken("");
  };

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout
    }),
    [token]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
