declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // default is 0px
    sm: false; // default is 600px
    md: false; // default is 900px
    lg: false; // default is 1200px
    xl: false; // default is 1536px
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
  interface Palette {
    banana: Palette['primary'];
  }
  interface PaletteOptions {
    banana: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    banana: true;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width'];
      breakpoint: BreakpointOverrides;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width'];
      breakpoint?: BreakpointOverrides;
    };
  }
}
