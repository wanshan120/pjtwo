import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: React.ReactNode;
  open?: boolean | null;
  url: string;
  // eslint-disable-next-line react/no-unused-prop-types, @typescript-eslint/no-explicit-any
  onClick?: any;
}
const ListItemWithButton: React.FC<Props> = ({ open, children, url }) => (
  <ListItem disablePadding sx={{ display: 'block' }}>
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
      }}
      component={Link}
      to={url}
    >
      {children}
    </ListItemButton>
  </ListItem>
);

export default ListItemWithButton;
