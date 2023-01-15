import { createTheme } from '@mui/material';
import { jaJP } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      mode: 'dark',
      primary: {
        main: '#007acc',
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
      fontSize: 12,
    },

    breakpoints: {
      values: {
        mobile: 0,
        tablet: 600,
        laptop: 1024,
        desktop: 1536,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            // h1: 'h2',
            // h2: 'h2',
            // h3: 'h2',
            // h4: 'h2',
            // h5: 'h2',
            // h6: 'h2',
            // subtitle1: 'h2',
            // subtitle2: 'h2',
            // body1: 'span',
            body2: 'span',
          },
        },
      },
    },
  },
  jaJP,
);

export default theme;
