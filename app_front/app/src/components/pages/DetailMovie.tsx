import * as React from 'react';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// atoms
import DrawerHeader from 'components/atoms/DrawerHeader';
import YoutubeIframe from 'components/atoms/YoutubeIframe';
import AspectRatioImage from 'components/atoms/AspectRatioImage';
// organisms
import ResponsiveMenuBar from 'components/organisms/ResponsiveMenuBar';
import AspectRatioBlock from 'components/molecules/AspectRatioBlock';
import VODSiteList from 'components/molecules/VODSiteList';
import DetailTagList from 'components/organisms/DetailTagList';
// images
import intothewildAama from 'data/images/intothewildAma.jpg';
// data
import { AllContentsTagData } from 'data/detailTag';

import Stack from '@mui/material/Stack';
// import Rating from '@mui/material/Rating';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import { styled } from '@mui/material/styles';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import Divider from '@mui/material/Divider';

// const labels: { [index: string]: string } = {
//   0.5: 'R.I.P',
//   1: 'D',
//   1.5: 'D+',
//   2: 'C',
//   2.5: 'C+',
//   3: 'B',
//   3.5: 'B+',
//   4: 'A',
//   4.5: 'A+',
//   5: 'GOD',
// };

// const getLabelText = (value: number) => `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;

// const StyledRating = styled(Rating)({
//   '& .MuiRating-iconFilled': {
//     color: '#ff6d75',
//   },
//   '& .MuiRating-iconHover': {
//     color: '#ff3d47',
//   },
// });

const PageDetailMovie = () => {
  // const theme = useTheme();
  // const [value, setValue] = React.useState<number | null>(2);
  // const [hover, setHover] = React.useState(-1);
  // console.log(AllContentsTagData.intoTheWild);
  const contentsTagData = AllContentsTagData.intoTheWild;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ResponsiveMenuBar />
      <Paper variant="outlined" component="main" sx={{ maxWidth: 1280, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
          <Paper elevation={0} sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item tablet={7}>
                <Typography
                  variant="h1"
                  display="inline"
                  sx={{ fontSize: '2.5rem', paddingLeft: 1 }}
                >
                  イントゥ・ザ・ワイルド
                </Typography>
              </Grid>

              <Grid item tablet={5}>
                <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Divider orientation="vertical" variant="middle" flexItem />

                  <Stack
                    direction="column"
                    justifyContent="flex-end "
                    alignItems="center"
                    spacing={0}
                    marginRight={1}
                  >
                    <Typography style={{ fontSize: 12 }}>評価指数</Typography>
                    <Paper elevation={0} sx={{ paddingLeft: 3, paddingRight: 2 }}>
                      <Typography display="inline" style={{ fontSize: '2.2rem' }}>
                        S
                      </Typography>
                      <Typography display="inline" style={{ fontSize: '1.4rem', marginLeft: 7 }}>
                        8.6
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

              {/* <Stack direction="column" justifyContent="center" alignItems="center" spacing={0}>
              評価指数
              <Paper variant="outlined" sx={{ paddingLeft: 1, paddingRight: 1 }}>
                <Box
                  sx={{
                    '& > legend': { mt: 2 },
                  }}
                >
                  <StyledRating
                    name="customized-color"
                    defaultValue={2}
                    getLabelText={getLabelText}
                    precision={0.5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  />
                  {value !== null && (
                    <Box sx={{ tablet: 2, display: 'inline' }}>
                      {labels[hover !== -1 ? hover : value]}
                    </Box>
                  )}
                </Box>
              </Paper>
            </Stack> */}
            </Grid>
          </Paper>
        </Box>

        <Box component="div" style={{ display: 'flex' }}>
          <AspectRatioBlock sx={{ width: '22%' }}>
            <AspectRatioImage src={intothewildAama} alt={intothewildAama} loading="lazy" />
          </AspectRatioBlock>
          <AspectRatioBlock
            aspectRatio="56.25%"
            sx={{ width: '56%', marginLeft: 1, marginRight: 1 }}
          >
            <YoutubeIframe
              src="https://www.youtube.com/embed/eQyE0Mu97Ec"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatioBlock>
          <AspectRatioBlock sx={{ width: '22%' }}>
            <Paper
              variant="outlined"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                height: '100%',
                minWidth: '200px',
              }}
            >
              <VODSiteList />
            </Paper>
          </AspectRatioBlock>
        </Box>
        <Grid container direction="row" columnSpacing={1} sx={{ marginTop: 1 }}>
          <Grid item tablet={8}>
            <Paper variant="outlined" sx={{ padding: 2 }}>
              <Typography
                variant="h4"
                display="inline"
                sx={{
                  fontSize: '1rem',
                  color: 'text.secondary',
                  fontWeight: 'bold',
                }}
              >
                あらすじ
              </Typography>
              <Typography paragraph sx={{ fontSize: '0.9rem', marginTop: 0.5 }}>
                裕福な家庭に生まれ、物質的に恵まれた環境で育ったクリス・マッキャンドレスは、エモリー大学を優秀な成績で卒業する。両親はハーバードのロースクールに進学することを望んでいたが、幼い頃から不和を見せつけられ、金で物ばかりを与えようとする両親に嫌気が差していたクリスは、学資預金を全額寄付し、世界の真理を求めアラスカへと旅に出る。
              </Typography>
            </Paper>
          </Grid>
          <Grid item tablet={4}>
            <DetailTagList detailCode={contentsTagData} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PageDetailMovie;
