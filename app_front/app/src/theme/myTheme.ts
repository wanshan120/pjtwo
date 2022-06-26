import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#08192D',
    },
    secondary: {
      main: '#926B71',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Noto Sans JP', '"Helvetica"', 'Arial', 'sans-serif'].join(','),
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 600,
      laptop: 1024,
      desktop: 1536,
    },
  },
});

export default theme;
