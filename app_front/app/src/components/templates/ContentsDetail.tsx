import { FC } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import BaseMenuBar from 'components/organisms/BaseMenuBar';
import BodyContent from 'components/organisms/BodyContent';

const NaviBar: FC = () => (
  <>
    <Helmet>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Helmet>
    <Box sx={{ display: 'flex' }}>
      <BaseMenuBar />
      <BodyContent />
    </Box>
  </>
);

export default NaviBar;
