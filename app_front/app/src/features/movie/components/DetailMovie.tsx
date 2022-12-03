import { FC } from 'react';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// components
import DrawerHeader from 'components/elements/DrawerHeader';
import ResponsiveMenuBar from 'components/menu/ResponsiveMenuBar';
import DictList from 'components/list/DictList';

// brother components
import SwipeableTab from 'features/movie/components/SwipeableTab';

// data
import { SampleContentsTagData } from 'data/detailTag';
import TagKeys from 'data/tagKeysType';
import SamplefreeTagsData from 'data/freeTags';

import Stack from '@mui/material/Stack';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import Divider from '@mui/material/Divider';

import useMovieDetail from 'features/movie/hooks/use-movie-detail';
import RateStack from 'features/movie/components/RateStack';
import PvComponent from './PvComponent';
import ImageComponent from './ImageComponent';
import Summary from './Summary';
// import { Movie } from 'models/movie';

const PageDetailMovie: FC<{ movieId: string }> = ({ movieId }) => {
  const contentsTagData = SampleContentsTagData;
  const jpReadingTags = TagKeys;

  // freeTags
  const freeTagData = SamplefreeTagsData;

  // use-query
  const movie = useMovieDetail(movieId);
  // console.log('use-query', movie);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ResponsiveMenuBar />
      <Paper variant="outlined" component="main" sx={{ maxWidth: 1280, p: 3 }}>
        <DrawerHeader />

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
                <Stack
                  direction="column"
                  justifyContent="flex-end "
                  alignItems="center"
                  spacing={0}
                >
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
        <Grid container direction="row" columnSpacing={1} sx={{ marginTop: 1 }}>
          <Grid container item direction="column" tablet={9} spacing={1}>
            <Grid item>
              <Summary summary={movie?.summary} />
            </Grid>
            <Grid item>
              <SwipeableTab />
            </Grid>
          </Grid>

          <Grid container item direction="column" spacing={1} tablet={3}>
            <Grid item>
              <Paper
                variant="outlined"
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  listStyle: 'none',
                  padding: 2,
                }}
              >
                <Typography
                  variant="h4"
                  paragraph
                  sx={{
                    fontSize: '1rem',
                    color: 'text.secondary',
                    fontWeight: 'bold',
                  }}
                >
                  キーワード
                </Typography>
                <DictList tagObjects={freeTagData} jpReadingObjects={jpReadingTags} />
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                variant="outlined"
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  listStyle: 'none',
                  padding: 2,
                }}
              >
                <Typography
                  variant="h4"
                  paragraph
                  sx={{
                    fontSize: '1rem',
                    color: 'text.secondary',
                    fontWeight: 'bold',
                  }}
                >
                  作品情報
                </Typography>
                <DictList tagObjects={contentsTagData} jpReadingObjects={jpReadingTags} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PageDetailMovie;
