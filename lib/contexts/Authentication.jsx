"use client";

import { useState, useContext, createContext, useEffect } from "react";
import { getUser, logoutUser } from "@/lib/actions/user";
import { getCookie } from "../actions/cookies";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const Auth = ({ userData, children }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const refetchUser = async () => {
  //     const user = await getUser()
  //       .then((data) => data)
  //       .catch((err) => err);

  //     return user;
  //   };

  //   if (!user) {
  //     const me = refetchUser();
  //     if (me) {
  //       console.log(me, typeof me);
  //       setUser(me);
  //     }
  //   }
  // }, []);

  const isAuthenticated = userData ? true : false;

  const logout = () => {
    // setUser(null);
    logoutUser();
  };

  // console.log(userData);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user: userData,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
