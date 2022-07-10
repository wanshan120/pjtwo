import { createTheme } from '@mui/material';
import { jaJP } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      mode: 'dark',
      primary: {
        main: '#323233',
      },
      secondary: {
        main: '#007acc',
      },
      background: {
        default: '#1e1e1e',
      },
      text: {
        primary: 'rgba(255, 255, 255, 0.85)',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
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
  },
  jaJP,
);

export default theme;
