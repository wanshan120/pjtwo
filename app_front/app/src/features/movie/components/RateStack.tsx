import { FC } from 'react';
import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { Movie } from 'models/movie';
import humanizeRate from 'lib/humanizeRate';

import RatingCountsBarChart from './RatingCountsBarChart';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 800,
};

const RateStack: FC<{ rates: Movie['rates']; movieId: string }> = ({ rates, movieId }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ListItemButton onClick={handleOpen}>
        <Stack direction="column" justifyContent="flex-end " alignItems="center" spacing={0}>
          <Typography style={{ fontSize: 12 }}>視聴者の評価</Typography>
          {rates?.map(
            (rate) =>
              rate.serviceName === 'MyService' &&
              (rate.rateValue ? (
                <Box>
                  <Typography display="inline" style={{ fontSize: '2.2rem' }}>
                    {humanizeRate(rate.rateValue)}
                  </Typography>
                  <Typography
                    display="inline"
                    style={{ fontSize: '1.4rem', marginLeft: 7 }}
                    // key={rate.serviceName.toString()}
                  >
                    {rate.rateValue}
                  </Typography>
                  <Typography display="inline" style={{ fontSize: '0.8rem' }}>
                    /10
                  </Typography>
                </Box>
              ) : (
                <Paper elevation={0} sx={{ paddingLeft: 3, paddingRight: 2 }}>
                  <Typography display="inline" style={{ fontSize: '2.2rem' }}>
                    RIP
                  </Typography>
                </Paper>
              )),
          )}
        </Stack>
      </ListItemButton>
      <Modal
        aria-labelledby="transition-modal-alluser-review-score"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper sx={style}>
            <Paper sx={{ padding: 5, width: '100%' }}>
              <h3>評価について</h3>
              <Typography>
                あなたの好きな作品、監督、ジャンルなどを元に、あなたの趣向に合わせた評価を提供します。
              </Typography>
              <Typography>公開日や広告の有無が評価に影響することはありません。</Typography>
              <h3>各レート毎の評価件数</h3>
              <React.Suspense fallback={<CircularProgress />}>
                <RatingCountsBarChart movieId={movieId} />
              </React.Suspense>
            </Paper>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default RateStack;
