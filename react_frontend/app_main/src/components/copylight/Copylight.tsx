/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
// import Typography from '@mui/material/Typography';

import Link from '@mui/material/Link';

import Typography from '@mui/material/Typography';

const Copyright: FC<{ mt: number }> = ({ mt }) => (
  <Typography variant="body1" color="text.secondary" align="center" sx={{ mt }}>
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
      PJ Two
    </Link>{' '}
    {new Date().getFullYear()}.
  </Typography>
);

export default Copyright;
