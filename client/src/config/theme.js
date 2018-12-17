
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import blue from '@material-ui/core/colors/blue';


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
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
