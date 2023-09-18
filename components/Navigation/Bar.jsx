import Toggle from "../Toggle";
import Link from "./Link";
import Logout from "./LogoutButton";
import { AppBar, Box } from "@mui/material";
import { getCookie } from "@/lib/actions/cookies";

const ROUTES = [
  { name: "Home", path: "/", protected: false, public: true },
  {
    name: "Dashboard",
    path: "/dashboard",
    protected: true,
  },
  {
    name: "Profile",
    path: "/profile",
    protected: true,
  },
];

const Bar = async () => {
  const token = await getCookie("token");

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
        {ROUTES.filter(
          (route) => route.protected === (token && true) || route.public
        ).map((route, i) => (
          <Link
            key={i}
            sx={{ ml: "1rem", color: "info.main" }}
            href={route.path}
            underline="none"
          >
            {route.name}
          </Link>
        ))}
      </Box>
      <Logout isAuthenticated={token} />
    </AppBar>
  );
};

export default Bar;
