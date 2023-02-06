import { FC } from 'react';
import * as React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { Movie } from 'models/movie';

import CircleRate from 'components/elements/CircleRate';
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
      <Stack
        direction="column"
        justifyContent="flex-end "
        alignItems="center"
        spacing={1}
        marginLeft={1}
      >
        <Typography style={{ fontSize: 12 }}>Nactm</Typography>
        {rates?.map(
          (rate) =>
            rate.serviceName === 'MyService' &&
            (rate.rateValue ? (
              <Paper
                key={rate.serviceName}
                elevation={0}
                sx={{ paddingLeft: 1, paddingRight: 1 }}
                onClick={handleOpen}
              >
                <CircleRate size={70} rate={rate.rateValue} serviceName="MyService" />
              </Paper>
            ) : (
              <Paper elevation={0} sx={{ paddingLeft: 1, paddingRight: 1 }}>
                <CircleRate size={70} rate={8} serviceName="MyService" />
              </Paper>
            )),
        )}
      </Stack>
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
              <h3>視聴者の評価</h3>
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
