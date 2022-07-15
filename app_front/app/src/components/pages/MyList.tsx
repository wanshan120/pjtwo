import * as React from 'react';

// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// atoms
import DrawerHeader from 'components/atoms/DrawerHeader';
// organisms
import ResponsiveMenuBar from 'components/organisms/ResponsiveMenuBar';

const MyList = () => (
  <>
    <DrawerHeader />

    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ResponsiveMenuBar />
      <Paper variant="outlined" component="main" sx={{ maxWidth: 1280, width: '100%', p: 3 }}>
        aaa
      </Paper>
    </Box>
  </>
);

export default MyList;
