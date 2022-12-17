import { FC } from 'react';
import * as React from 'react';

// MUI
// import { styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

// MUI
// import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
// icon
import ClearIcon from '@mui/icons-material/Clear';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// components
import SortMenu from 'components/menu/SortMenu';
import humanizeRate from 'lib/humanizeRate';

// img
// import intothewildAama from 'data/images/intothewildAma.jpg';

// date
import { formatDistance, subDays } from 'date-fns';
import ja from 'date-fns/locale/ja';

import { Movie } from 'models/movie';
// import ShowMoreText from 'react-show-more-text';

// import useReview from 'features/review/hooks/use-reviewl';
import useRelatedMovies from '../hooks/use-related-movies';

const RelatedTitleList: FC<{ tagIds: Movie['metaTags'] }> = ({ tagIds }) => {
  const isSeriesObj = tagIds?.find(({ id }) => id === 'series');
  const seriesId = isSeriesObj?.tags?.find(({ id }) => id)?.id;
  // use-query
  // const series = useSeries(seriedId)
  const relatedMovies = useRelatedMovies(seriesId);
  console.log(relatedMovies);
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };
  // const [open, setOpen] = React.useState(true);
  // const handlShowMoreTextToggle = () => {
  //   setOpen(!open);
  // };

  return (
    <Grid container item direction="column">
      <Grid item mobile={12} tablet={12} sx={{ m: 0, p: 0 }}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
          <ToggleButtonGroup value={alignment} exclusive onChange={handleChange}>
            <ToggleButton value="all">全て</ToggleButton>
            <ToggleButton value="movie">映画</ToggleButton>
            <ToggleButton value="tv">TVドラマ</ToggleButton>
            <ToggleButton value="anime">アニメ</ToggleButton>
            <ToggleButton value="comic">漫画</ToggleButton>
            <ToggleButton value="novel">小説</ToggleButton>
          </ToggleButtonGroup>
          <SortMenu />
        </Stack>
      </Grid>
      <Grid
        item
        mobile={12}
        tablet={12}
        sx={{ m: 0, p: 0, border: '1px solid rgba(255, 255, 255, 0.12)' }}
      >
        {seriesId ? (
          <Grid container direction="row" justifyContent="flex-start" rowSpacing={2}>
            {relatedMovies?.map((items) => (
              <Grid
                container
                item
                key={items.id}
                direction="row"
                justifyContent="flex-start"
                columnSpacing={2}
                wrap="nowrap"
              >
                <Grid item mobile={2} sx={{ lineHeight: 0 }}>
                  <img
                    src={items.image.path}
                    alt={items.image.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      margin: 0,
                      padding: 0,
                      borderRadius: '10px',
                    }}
                  />
                </Grid>
                <Grid container item mobile={10}>
                  <Grid
                    container
                    item
                    mobile={12}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    wrap="nowrap"
                  >
                    <Grid item>
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                      >
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip label="映画" sx={{ borderRadius: '0px' }} />
                          <Typography id="transition-modal-title" variant="h5" component="h2">
                            {items.title}
                          </Typography>
                        </Stack>
                        <Box>
                          <IconButton aria-label="item menu">
                            <MoreVertIcon />
                          </IconButton>
                          <IconButton aria-label="item clear">
                            <ClearIcon />
                          </IconButton>
                        </Box>
                      </Stack>
                    </Grid>

                    <Grid container item direction="row">
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Paper
                          variant="outlined"
                          sx={{
                            paddingTop: 0.5,
                            paddingBottom: 0.5,
                            paddingLeft: 2,
                            paddingRight: 2,
                            textAlign: 'center',
                          }}
                        >
                          {items.rates?.map(
                            (rate) =>
                              rate.serviceName === 'MyService' &&
                              (rate.rateValue ? (
                                <Box key={rate.serviceName}>
                                  <Typography display="inline" variant="h6">
                                    {humanizeRate(rate.rateValue)}
                                  </Typography>
                                  <Typography display="inline" sx={{ marginLeft: 1 }}>
                                    {rate.rateValue}
                                  </Typography>
                                  <Typography
                                    display="inline"
                                    variant="body2"
                                    sx={{ marginLeft: 0.5, color: 'text.disabled' }}
                                  >
                                    /10
                                  </Typography>
                                </Box>
                              ) : (
                                <Typography display="inline" variant="h6">
                                  RIP
                                </Typography>
                              )),
                          )}
                        </Paper>
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          spacing={1}
                        >
                          {items.tags?.map((tag) =>
                            tag.category === 'publicationDate' ? (
                              <React.Fragment key={items.id}>
                                <Typography component="span">{tag.name}</Typography>
                                <Divider orientation="vertical" variant="middle" flexItem />
                              </React.Fragment>
                            ) : (
                              <Typography key={tag.id}>{tag.name}</Typography>
                            ),
                          )}

                          <Divider orientation="vertical" variant="middle" flexItem />
                          <Typography fontSize="0.9rem" color="text.secondary">
                            {formatDistance(subDays(new Date(), 3), new Date(), {
                              addSuffix: true,
                              locale: ja,
                            })}
                            に追加
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>

                    <Grid container item direction="row">
                      <Grid item tablet={12}>
                        <Typography
                          variant="h6"
                          display="inline"
                          sx={{
                            fontWeight: 'bold',
                            marginTop: 1,
                            marginBottom: 1,
                          }}
                        >
                          {items.review.title}
                        </Typography>
                      </Grid>
                      <Grid item tablet={5}>
                        <Typography variant="body2" display="block">
                          {items.review.content}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        ) : (
          'no items'
        )}
      </Grid>
    </Grid>
  );
};

export default RelatedTitleList;
