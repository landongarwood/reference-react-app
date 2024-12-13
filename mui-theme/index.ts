import { createTheme, SimplePaletteColorOptions } from "@mui/material";
import { ColorPartial } from "@mui/material/styles/createPalette";

declare module "@mui/material" {
  interface Color {
    10: string;
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    green: ColorPartial;
    purple: ColorPartial;
    red: ColorPartial;
    yellow: ColorPartial;
    blue: SimplePaletteColorOptions & ColorPartial;
    cyan: ColorPartial;
    white: string;
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    green: ColorPartial;
    purple: ColorPartial;
    red: ColorPartial;
    yellow: ColorPartial;
    blue: SimplePaletteColorOptions & ColorPartial;
    cyan: ColorPartial;
    white: string;
  }
}

// Update the Button's color options to include an ochre option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    blue: true;
  }
}

const theme = createTheme({
  components: {
    MuiScopedCssBaseline: {
      styleOverrides: {
        root: {
          "& *": {
            boxSizing: "border-box",
          },
          "& *::before, *::after": {
            boxSizing: "border-box",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#F5F5F7",
        },
      },
    },
  },
  palette: {
    blue: {
      200: "#E2EEF6",
      300: "#97D1EE",
      400: "#368BCC",
      500: "#33B7EE",
      600: "#2782C8",
      700: "#2481C8",
      800: "#2FA3DE",
      900: "#0D99D7",
      dark: "#33B7EE",
      main: "#2FA3DE",
    },
    cyan: {
      100: "#E1EFF1",
      400: "#28a2e1",
    },
    green: {
      100: "#04475F",
      200: "#499F17",
      500: "#74BF49",
      600: "#E8F1E1",
      700: "#EDF8FE",
    },
    grey: {
      10: "#F8F9FA",
      50: "#F5F5F7",
      100: "#eeeeee",
      200: "#DFDFDF",
      300: "#c1c1c1",
      400: "#B6B6B6",
      500: "#808080",
      600: "#716F70",
      700: "#4C4C4F",
      800: "#242021",
      900: "#231F20",
    },
    primary: {
      dark: "#33B7EE",
      light: "#2481C8",
      main: "#2FA3DE",
    },
    purple: {
      100: "#E9E6FF",
      200: "#DFDCF5",
      300: "#5C4CC0",
      400: "#5344AB",
      500: "#413394",
    },
    red: {
      500: "#D94F4F",
      600: "#DC3545",
    },
    white: "#FFFFFF",
    yellow: {
      50: "#FFF6DE",
      100: "#F0B849",
      200: "#FAF089",
      300: "#E29E5D",
      400: "#DFAA43",
      500: "#74B14A",
    },
  },
  typography: {
    allVariants: {
      color: "#231F20",
    },
    fontFamily: `'Encode Sans', sans-serif`,
  },
});

export default theme;
