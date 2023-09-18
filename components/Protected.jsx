"use client";

import { Fragment, useEffect } from "react";
import { useAuth } from "@/lib/contexts/Authentication";
import { getUser } from "@/lib/actions/user";

export default function ProtectedLayout({ children, token, user }) {
  // const { isAuthenticated, setUser } = useAuth();

  // useEffect(() => {
  //   const refetchUser = async () => {
  //     const me = await getUser(token).then((data) => data);
  //     console.log(me);
  //     return me;
  //   };

  //   if (!isAuthenticated) {
  //     setUser(refetchUser());
  //     // setUser(user);
  //   }
  // }, []);

  // if (isAuthenticated) {
  return <Fragment>{children}</Fragment>;
  // }
}
