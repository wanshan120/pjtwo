import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: React.ReactNode;
  open?: boolean | null;
}

const StyledListItemIcon: React.FC<Props> = ({ open, children }) => (
  <ListItemIcon
    sx={{
      minWidth: 0,
      mr: open ? 3 : 'auto',
      justifyContent: 'center',
    }}
  >
    {children}
  </ListItemIcon>
);

export default StyledListItemIcon;
