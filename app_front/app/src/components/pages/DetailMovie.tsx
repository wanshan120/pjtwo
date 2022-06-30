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
// images
import intothewildAama from 'data/images/intothewildAma.jpg';

import Stack from '@mui/material/Stack';
// import Rating from '@mui/material/Rating';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import { styled } from '@mui/material/styles';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';

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
  console.log('detail');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ResponsiveMenuBar />
      <Box component="main" sx={{ maxWidth: 1280, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item tablet={7}>
              <h1 style={{ fontSize: '2rem' }}>イントゥ・ザ・ワイルド</h1>
            </Grid>
            <Grid item tablet={5}>
              <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                  marginRight={1}
                >
                  評価指数
                  <Paper variant="outlined" elevation={0} sx={{ paddingLeft: 1, paddingRight: 1 }}>
                    <Typography display="inline" style={{ fontSize: 44 }}>
                      S
                    </Typography>
                    <Typography display="inline" style={{ fontSize: 23, marginLeft: 7 }}>
                      86
                    </Typography>
                    <Typography display="inline" style={{ fontSize: 11 }}>
                      /100
                    </Typography>
                  </Paper>
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                  marginRight={2}
                >
                  マイレート
                  <Paper variant="outlined" elevation={0} sx={{ paddingLeft: 1, paddingRight: 1 }}>
                    <Typography display="inline" style={{ fontSize: 44 }}>
                      A+
                    </Typography>
                    <Typography display="inline" style={{ fontSize: 23, marginLeft: 7 }}>
                      9.5
                    </Typography>
                    <Typography display="inline" style={{ fontSize: 11 }}>
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
                  通知
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
                  後で
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
        </Box>

        <Box component="div" style={{ display: 'flex' }}>
          <AspectRatioBlock sx={{ width: '22%' }}>
            <AspectRatioImage src={intothewildAama} alt={intothewildAama} loading="lazy" />
          </AspectRatioBlock>
          <AspectRatioBlock
            aspectRatio="56.25%"
            sx={{ width: '56%', marginLeft: '5px', marginRight: '5px' }}
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

        <Box sx={{ display: 'block' }}>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
            elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
            hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
            Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis
            viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
            Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
            at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
            ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus
            sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in.
            In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
            et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique
            sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo
            viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PageDetailMovie;
