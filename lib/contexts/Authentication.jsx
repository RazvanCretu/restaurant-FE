"use client";

import { useState, useContext, createContext } from "react";
import { logoutUser } from "../actions/user";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const Auth = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    logoutUser();
  };

  // console.log(user);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: user ? true : false, user, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
