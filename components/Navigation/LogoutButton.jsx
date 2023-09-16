"use client";

import { useAuth } from "@/lib/contexts/Authentication";
import { Button } from "@mui/material";
import Link from "./Link";
import { Fragment } from "react";

const Logout = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Fragment>
      {isAuthenticated ? (
        <Link
          href="#"
          onClick={logout}
          sx={{ ml: "1rem", color: "info.main" }}
          underline="none"
        >
          Logout
        </Link>
      ) : (
        <Link
          sx={{ ml: "1rem", color: "info.main" }}
          href="/login"
          underline="none"
        >
          Login
        </Link>
      )}
    </Fragment>
  );
};

export default Logout;
