"use client";

import { Fragment, useEffect } from "react";
import { useAuth } from "@/lib/contexts/Authentication";
import { getUser } from "@/lib/actions/user";

export default function ProtectedLayout({ children, token }) {
  const { isAuthenticated, setUser } = useAuth();

  useEffect(() => {
    const refetchUser = async () => {
      const me = await getUser(token).then((data) => data);
      console.log(me);
      return me;
    };

    if (token && !isAuthenticated) {
      setUser(refetchUser());
    }
  }, []);

  return <Fragment>{children}</Fragment>;
}
