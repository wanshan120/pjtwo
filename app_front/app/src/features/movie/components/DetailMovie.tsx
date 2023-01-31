import { FC } from 'react';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import Divider from '@mui/material/Divider';

// brother components
import SwipeableTab from 'features/movie/components/SwipeableTab';
import useMovieDetail from 'features/movie/hooks/use-movie-detail';
import RateStack from 'features/movie/components/RateStack';
import PvComponent from './PvComponent';
import ImageComponent from './ImageComponent';
import Summary from './Summary';
import StreamingList from './StreamingList';
import TagList from './TagList';

const PageDetailMovie: FC<{ movieId: string }> = ({ movieId }) => {
  const movie = useMovieDetail(movieId);

  return (
    <div>
      <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
        <Paper elevation={0} sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h1" display="inline" sx={{ fontSize: '2.5rem', paddingLeft: 1 }}>
              {movie?.title}
            </Typography>

            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Divider orientation="vertical" flexItem style={{ marginRight: 5 }} />
              <RateStack rates={movie?.rates} movieId={movieId} />
              <Stack
                direction="column"
                justifyContent="flex-end "
                alignItems="center"
                spacing={0}
                marginRight={2}
              >
                <Typography style={{ fontSize: 12 }}>マイレート</Typography>
                <Paper elevation={0} sx={{ paddingLeft: 1, paddingRight: 2 }}>
                  <Typography display="inline" style={{ fontSize: '2.2rem' }}>
                    A+
                  </Typography>
                  <Typography display="inline" style={{ fontSize: '1.4rem', marginLeft: 7 }}>
                    9.6
                  </Typography>
                  <Typography display="inline" style={{ fontSize: '0.8rem' }}>
                    /10
                  </Typography>
                </Paper>
              </Stack>
              <Stack
                direction="column"
                justifyContent="flex-end "
                alignItems="center"
                spacing={0}
                marginRight={1}
              >
                <Typography style={{ fontSize: 12 }}>通知</Typography>

                <Paper elevation={0} sx={{ paddingLeft: 1, paddingRight: 1 }}>
                  <NotificationAddOutlinedIcon sx={{ fontSize: 40 }} />
                </Paper>
              </Stack>
              <Stack direction="column" justifyContent="flex-end " alignItems="center" spacing={0}>
                <Typography style={{ fontSize: 12 }}>後で</Typography>

                <Paper elevation={0} sx={{ paddingLeft: 1, paddingRight: 1 }}>
                  <BookmarkBorderOutlinedIcon sx={{ fontSize: 40 }} />
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
            <TagList tags={movie?.keywordTags} subHeader="キーワード" />
            <Box sx={{ marginTop: 1 }}>
              <TagList tags={movie?.metaTags} subHeader="作品情報" />
            </Box>
          </Grid>
        </Grid>
        <Grid container item direction="row" tablet={9} spacing={1}>
          <Grid container item mobile={12} tablet={12}>
            <Summary summary={movie?.summary} />
          </Grid>
          <Grid container item mobile={12} tablet={12}>
            <StreamingList plannings={movie?.plannings} />
          </Grid>
          <Grid container item mobile={12} tablet={12}>
            <SwipeableTab tagIds={movie?.keywordTags} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PageDetailMovie;
