import Toggle from "../Toggle";
import Link from "./Link";
import { AppBar, Box } from "@mui/material";
import Logout from "./LogoutButton";

const ROUTES = [
  { name: "Home", path: "/" },
  {
    name: "Dashboard",
    path: "/dashboard",
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
        <Logout />
      </Box>
    </AppBar>
  );
};

export default Bar;
