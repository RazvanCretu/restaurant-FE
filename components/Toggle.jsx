"use client";

import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";

const Toggle = () => {
  const theme = useTheme();
  return (
    <div>
      Theme is: {theme.palette.mode}
      <Button onClick={theme.toggle}>Change Theme</Button>
    </div>
  );
};

export default Toggle;
