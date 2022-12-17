import { FC } from 'react';
import * as React from 'react';
import ClampLines from 'react-clamp-lines';

// MUI
// import { styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
// icon
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

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
// import classes from 'lib/react-clamp-lines.module.css';
import 'lib/react-clamp-lines.css';
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
    // <Grid container item direction="column">
    //   <Grid item mobile={12} tablet={12} sx={{ m: 0, p: 0 }}>
    <div>
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} my={2}>
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
      {/* // </Grid> */}
      {/* <Grid container mobile={12} tablet={12}> */}
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
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={1}
                  width="100%"
                >
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
                      <IconButton aria-label="item bookmark">
                        <BookmarkBorderOutlinedIcon />
                      </IconButton>
                      <IconButton aria-label="item done">
                        <DoneOutlinedIcon />
                      </IconButton>
                    </Box>
                  </Stack>

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

                  <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={0.5}
                    px={1}
                  >
                    <Typography variant="h6" display="block">
                      {items.review.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      display="block"
                      sx={{ wordBreak: 'break-word', fontSize: 12 }}
                    >
                      {items.review.content && (
                        <ClampLines
                          text={items.review.content}
                          id="really-unique-id"
                          lines={3}
                          ellipsis="..."
                          moreText="さらに表示"
                          lessText="閉じる"
                          // className={classes.clamplinescustom}
                          className="clampLinesCustom"
                          innerElement="p"
                        />
                      )}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
        'no items'
      )}
      {/* </Grid> */}
      {/* // </Grid> */}
    </div>
  );
};

export default RelatedTitleList;
