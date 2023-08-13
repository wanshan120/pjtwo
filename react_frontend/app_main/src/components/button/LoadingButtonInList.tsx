/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import ListItem from '@mui/material/ListItem';

type LoadingButtonInListProps = {
  children: React.ReactNode;
  open?: boolean | null;
} & LoadingButtonProps;

const LoadingButtonInList: React.FC<LoadingButtonInListProps> = ({
  open,
  children,
  ...otherProps
}) => (
  <ListItem disablePadding sx={{ display: 'block' }}>
    <LoadingButton
      sx={{
        minHeight: 48,
        px: 2.5,
        justifyContent: open ? 'initial' : 'flex-start',
      }}
      {...otherProps}
      fullWidth
      color="inherit"
    >
      {children}
    </LoadingButton>
  </ListItem>
);

export default LoadingButtonInList;
