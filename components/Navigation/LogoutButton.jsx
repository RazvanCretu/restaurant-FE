"use client";

import { useAuth } from "@/lib/contexts/Authentication";
import { IconButton } from "@mui/material";
import { Fragment } from "react";
import { LogoutRounded } from "@mui/icons-material";
import Link from "./Link";

const Logout = ({ isAuthenticated }) => {
  const { logout } = useAuth();

  return (
    <Fragment>
      {isAuthenticated ? (
        <IconButton
          sx={{
            borderRadius: "50%",
            position: "fixed",
            bottom: 0,
            right: 0,
            margin: "auto 5rem 3rem auto",
          }}
          variant="contained"
          aria-label="Logout"
          onClick={logout}
        >
          <LogoutRounded />
        </IconButton>
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
