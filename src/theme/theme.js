import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import amber from "@material-ui/core/colors/amber";
import grey from "@material-ui/core/colors/grey";

// Create a theme instance.
//https://v3.material-ui.com/style/color/#color-tool
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#388e3c",
    },
    secondary: amber,
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    h2: {
      color: "white",
      fontStyle: "italic",
      fontWeight: 300,
      fontSize: "2rem",
      lineHeight: 1.5,
    },
    subtitle1: {
      color: grey.A700,
      fontWeight: 700,
      lineHeight: 1.5,
    },
  },
});

export default theme;
