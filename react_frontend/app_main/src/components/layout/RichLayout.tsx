import { Outlet } from 'react-router-dom';

import { Box, Paper } from '@mui/material';

import ResponsiveMenuBar from 'features/menu/components/ResponsiveMenuBar';
import DrawerHeader from 'components/elements/DrawerHeader';

const RichLayout = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <ResponsiveMenuBar />
    <Paper variant="outlined" component="main" sx={{ maxWidth: 1280, width: '100%', p: 3 }}>
      <DrawerHeader />
      <Outlet />
    </Paper>
  </Box>
);

export default RichLayout;
