"use client";

import { useState, useContext, createContext, useEffect } from "react";
import { getUser, logoutUser } from "@/lib/actions/user";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const Auth = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const refecthUser = async () => {
      const userData = await getUser();
      return userData;
    };

    if (!user) {
      refecthUser().then((data) => {
        setUser(data);
        console.log(data);
      });
    }
  }, []);

  const isAuthenticated = user ? true : false;

  const logout = () => {
    setUser(null);
    logoutUser();
  };

  // console.log(userData);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
