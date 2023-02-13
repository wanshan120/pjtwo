import { FC } from 'react';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

// brother components
import SwipeableTab from 'features/movie/components/SwipeableTab';
import useMovieDetail from 'features/movie/hooks/use-movie-detail';
import RateStack from 'features/movie/components/RateStack';
import CircleRate from 'components/elements/CircleRate';
// import BookmarkButton from 'components/button/BookmarkButton';
import BellButton from 'components/button/BellButton';
import WatchIcon from 'features/watchlist/component/watchIcon';
import PvComponent from './PvComponent';
import ImageComponent from './ImageComponent';
import Summary from './Summary';
import StreamingList from './StreamingList';
import TagList from './TagList';

const PageDetailMovie: FC<{ movieId: string }> = ({ movieId }) => {
  const movie = useMovieDetail(movieId);

  return (
    <div>
      {movie && (
        <div>
          <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
            <Paper elevation={0} sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}>
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                  variant="h1"
                  display="inline"
                  sx={{ fontSize: '2.5rem', paddingLeft: 1 }}
                >
                  {movie.title}
                </Typography>

                <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Divider orientation="vertical" flexItem style={{ marginRight: 5 }} />
                  <RateStack rates={movie?.rates} movieId={movieId} />
                  <Stack
                    direction="column"
                    justifyContent="flex-end "
                    alignItems="center"
                    spacing={1}
                  >
                    <Typography style={{ fontSize: 12 }}>マイレート</Typography>
                    <Paper elevation={0} sx={{ paddingLeft: 1, paddingRight: 1 }}>
                      <CircleRate size={70} rate={8} serviceName="MyRate" />
                    </Paper>
                  </Stack>
                  <Stack
                    direction="column"
                    justifyContent="flex-end "
                    alignItems="center"
                    spacing={0}
                  >
                    <Typography style={{ fontSize: 12 }}>通知</Typography>

                    <Paper elevation={0} sx={{ paddingLeft: 1, paddingRight: 1 }}>
                      <BellButton disabled={false} size={37} />
                    </Paper>
                  </Stack>
                  <Stack
                    direction="column"
                    justifyContent="flex-end "
                    alignItems="center"
                    spacing={0}
                  >
                    <Typography style={{ fontSize: 12 }}>後で見る</Typography>

                    <Paper elevation={0} sx={{ paddingLeft: 1, paddingRight: 1 }}>
                      <WatchIcon productId={movie?.id} size={37} />
                    </Paper>
                  </Stack>
                </Box>
              </Grid>
            </Paper>
          </Box>
          <Box component="div" style={{ display: 'flex' }}>
            <ImageComponent images={movie?.images} />
            <PvComponent pvs={movie?.pvs} />
          </Box>
          <Grid container direction="row-reverse" columnSpacing={1} sx={{ marginTop: 1 }}>
            <Grid container item direction="row" spacing={1} tablet={3}>
              <Grid item mobile={12} tablet={12}>
                {movie?.keywordTags && <TagList tags={movie?.keywordTags} subHeader="キーワード" />}
                {movie?.metaTags && (
                  <Box sx={{ marginTop: 1 }}>
                    <TagList tags={movie?.metaTags} subHeader="作品情報" />
                  </Box>
                )}
              </Grid>
            </Grid>
            <Grid container item direction="row" tablet={9} spacing={1}>
              <Grid item mobile={12} tablet={12} sx={{ width: '100%' }}>
                <Summary summary={movie?.summary} />
              </Grid>
              <Grid item mobile={12} tablet={12} sx={{ width: '100%' }}>
                <StreamingList plannings={movie?.plannings} />
              </Grid>
              <Grid item mobile={12} tablet={12} sx={{ width: '100%' }}>
                <SwipeableTab tagIds={movie?.keywordTags} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default PageDetailMovie;
