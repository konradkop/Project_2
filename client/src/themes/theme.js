import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    fontSizeSm: 10,
    fontSizeMed: 20,
    fontSizeLar: 40,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    white: { main: "#FFFFFF" },
    secondary: { main: "#B0B0B0" }
  },
  spacing: 1,
  buttonPadding: "12px 50px"
});
