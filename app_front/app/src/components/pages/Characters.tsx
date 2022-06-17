import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';

import HomeButton from 'containers/molecules/HomeButton';
import { Stack, Button } from '@mui/material';

const Characters: FC = () => (
  <header>
    <h1>SLAM DUNK 登場人物</h1>
    <Outlet />
    <Divider hidden />
    <HomeButton />
    <Stack direction="row" spacing={2} sx={{ m: 2, p: 2 }}>
      <Button variant="contained" color="primary">
        primary
      </Button>
      <Button variant="contained" color="secondary">
        secondary
      </Button>
      <Button variant="contained" color="warning">
        warning
      </Button>
      <Button variant="contained" color="info">
        info
      </Button>
      <Button variant="contained" color="success">
        success
      </Button>
    </Stack>
  </header>
);

export default Characters;
