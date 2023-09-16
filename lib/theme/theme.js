"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const lightPalette = {
  mode: "light",
  body: {
    main: "beige",
  },
};
const darkPalette = {
  mode: "dark",
  body: {
    main: "darkblue",
  },
};

const makeTheme = (mode) =>
  createTheme({
    palette: {
      ...(mode ? darkPalette : lightPalette),
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    components: {},
  });

export default makeTheme;
