"use client";

import { useAuth } from "@/lib/contexts/Authentication";
import { IconButton } from "@mui/material";
import { Fragment } from "react";
import { LogoutRounded } from "@mui/icons-material";

const Logout = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Fragment>
      {isAuthenticated && (
        <IconButton
          sx={{
            borderRadius: "50%",
            position: "absolute",
            margin: "auto 5rem 3rem auto",
          }}
          aria-label="Logout"
          onClick={logout}
        >
          <LogoutRounded />
        </IconButton>
      )}
    </Fragment>
  );
};

export default Logout;
