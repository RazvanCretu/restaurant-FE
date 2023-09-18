import Toggle from "../Toggle";
import Link from "./Link";
import { AppBar, Box } from "@mui/material";

const ROUTES = [
  { name: "Home", path: "/" },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Login",
    path: "/login",
  },
];

const Bar = () => {
  return (
    <AppBar
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <Toggle />
      <Box>
        {ROUTES.map((route, i) => (
          <Link
            sx={{ ml: "1rem", color: "info.main" }}
            key={i}
            href={route.path}
            underline="none"
          >
            {route.name}
          </Link>
        ))}
      </Box>
    </AppBar>
  );
};

export default Bar;
