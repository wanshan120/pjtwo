import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';

// img
import intothewildAama from 'data/images/intothewildAma.jpg';

const style = {
  position: 'absolute' as const,
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 800,
  p: 2,
};

const StyledSearchButton = styled(Button)(({ theme }) => ({
  color: 'inherit',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up('mobile')]: {
    width: '20ch',
  },
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

const SearchModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <StyledSearchButton onClick={handleOpen} startIcon={<SearchIcon />} variant="outlined">
        検索
      </StyledSearchButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        // sx={{ backdropFilter: 'blur(1px)' }}
      >
        <Fade in={open}>
          <Paper sx={style}>
            <Paper
              component="form"
              sx={{ paddingBottom: 2, display: 'flex', alignItems: 'center', width: '100%' }}
            >
              <SearchIcon sx={{ fontSize: 30 }} />
              <InputBase
                sx={{ ml: 2, flex: 1, fontSize: '1.2rem' }}
                placeholder="検索"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
            </Paper>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ my: 3 }}
            >
              <Grid item mobile={12} sx={{ m: 0, p: 0 }}>
                <ListItemButton>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item mobile={1.5} sx={{ lineHeight: 0 }}>
                      <img
                        src={intothewildAama}
                        alt={intothewildAama}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', margin: 0, padding: 0 }}
                      />
                    </Grid>
                    <Grid item mobile={10.5}>
                      <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          spacing={1}
                        >
                          <Chip label="映画" color="warning" variant="outlined" />
                          <Chip label="視聴済み" variant="outlined" />
                        </Stack>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                          イントゥザワイルド
                        </Typography>
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          spacing={1}
                        >
                          <Typography fontSize="1rem">2007</Typography>
                          <Typography fontSize="1rem">心温まる</Typography>
                          <Typography fontSize="1rem">人生</Typography>
                          <Typography fontSize="1rem">アナーキズム</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItemButton>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default SearchModal;
