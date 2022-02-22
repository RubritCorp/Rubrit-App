import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { heading: "Poppins", body: "Poppins" };

// const breakpoints = createBreakpoints({
//   sm: "40em",
//   md: "52em",
//   lg: "64em",
//   xl: "80em",
// });

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const  colors: {
    light_green: "#44FEB0",
    dark_blue: "#164399",
    dark_green: "#292E1E",
    medium_grey: "#BBE1C3",
    light_grey: "#F9FAFB",
    medium_green: "#2EB67D",
    light_blue: "#1F57C3",
    dark_grey: "#B6B6B6",
    light_green_sub: {
      50: "#dcfff1",
      100: "#aeffde",
      200: "#7efec9",
      300: "#4dfeb4",
      400: "#23fea0",
      500: "#0fe486",
      600: "#01b267",
      700: "#007f49",
      800: "#004d2b",
      900: "#001b0c",
    },
    dark_blue_sub: {
      50: "#e4efff",
      100: "#bad0f9",
      200: "#8fb0f0",
      300: "#6391e9",
      400: "#3871e1",
      500: "#2058c8",
      600: "#16449c",
      700: "#0e3170",
      800: "#051d46",
      900: "#000a1c",
    },
    dark_green_sub: {
      50: "#f2f6eb",
      100: "#dce1d1",
      200: "#c5cdb4",
      300: "#aeb996",
      400: "#96a379",
      500: "#7d8a5f",
      600: "#616c49",
      700: "#464d34",
      800: "#292e1e",
      900: "#0d1004",
    },
    medium_grey_sub: {
      50: "#e9f8ec",
      100: "#cae8d0",
      200: "#a9d7b2",
      300: "#86c794",
      400: "#65b875",
      500: "#4c9e5c",
      600: "#3b7b47",
      700: "#295832",
      800: "#17351e",
      900: "#031306",
    },
    light_grey_sub: {
      50: "#f0f2f5",
      100: "#d5d8db",
      200: "#b9bec4",
      300: "#9ba5af",
      400: "#7e8b99",
      500: "#657281",
      600: "#4e5863",
      700: "#393f46",
      800: "#22262a",
      900: "#0a0d0f",
    },
    medium_green_sub: {
      50: "#e0fdf0",
      100: "#bcf1db",
      200: "#96e6c4",
      300: "#6fdbae",
      400: "#48d197",
      500: "#2eb77e",
      600: "#218e62",
      700: "#146645",
      800: "#043e28",
      900: "#00160b",
    },
    light_blue_sub: {
      50: "#e4efff",
      100: "#bad0fa",
      200: "#8fb1f1",
      300: "#6491e8",
      400: "#3972e0",
      500: "#1f58c6",
      600: "#15459b",
      700: "#0c3170",
      800: "#031d46",
      900: "#000a1d",
    },
    dark_grey_sub: {
      50: "#fbf0f2",
      100: "#dcd8d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#737373",
      600: "#595959",
      700: "#404040",
      800: "#282626",
      900: "#150a0d",
    },
  }
    
const theme = extendTheme({
  colors,
  fonts,
  config,

  // breakpoints,
});

export default theme;
