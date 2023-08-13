/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ListItemText from '@mui/material/ListItemText';
import { LoadingButton } from '@mui/lab';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import StyledListItemIcon from 'components/elements/StyledListItemIcon';

import { useStateContext } from 'context';
import useGetLogoutUser from 'features/auth/hooks/use-get-logout-user';

// data
import { urlPatterns } from 'urlPatterns';

type LogoutModalProps = {
  open: boolean;
};

const LogoutButton: FC<LogoutModalProps> = ({ open }) => {
  // modal
  const [modalOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // logout
  const stateContext = useStateContext();
  const user = stateContext.state.authUser;
  const { onLogoutHandler, isLoading } = useGetLogoutUser();

  return (
    <div>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          onClick={handleOpen}
        >
          <StyledListItemIcon open={open}>
            <LogoutIcon />
          </StyledListItemIcon>
          <ListItemText primary={urlPatterns.logout.name} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={modalOpen}>
          <Paper
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: 800,
              px: 5,
              py: 2,
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ my: 3 }}
            >
              <Grid item mobile={12} textAlign="center">
                <Typography
                  id="modal-logout"
                  variant="h5"
                  component="h2"
                  sx={{ display: 'inline' }}
                >
                  {user?.name}
                </Typography>
                <Typography variant="h5" component="h2" sx={{ display: 'inline', marginLeft: 1 }}>
                  からログアウトしますか？
                </Typography>
              </Grid>
              <Grid item mobile={12} sx={{ marginTop: 5, p: 0 }} textAlign="center">
                <LoadingButton
                  onClick={onLogoutHandler}
                  loading={isLoading}
                  variant="outlined"
                  size="large"
                >
                  ログアウト
                </LoadingButton>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default LogoutButton;
