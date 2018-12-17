import { createMuiTheme } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[200],
      main: blue[300],
      dark: blue[400],
      contrastText: 'rgb(0,0,0)',
    },
  },
});

export default theme;
