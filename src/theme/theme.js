import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import amber from '@material-ui/core/colors/amber';


// Create a theme instance.
//https://v3.material-ui.com/style/color/#color-tool
const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#388e3c',
      },
      secondary: amber,
      error: {
        main: red.A400,
      },
    },
  typography: {
    h2: {
      color: "white",
      fontStyle: "italic",
      fontWeight: 300,
      fontSize: "2rem",
      lineHeight: 1.5,
    }
  },
});

export default theme;