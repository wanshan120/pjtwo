import * as React from 'react';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

// list

import Paper from '@mui/material/Paper';

const PageDetailMovie = () => {
  // const theme = useTheme();
  console.log('detail');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ResponsiveMenuBar />
      <Box component="main" sx={{ maxWidth: 1280, p: 3, bgcolor: '#9a9a9a' }}>
        <DrawerHeader />
        <h1 style={{ fontSize: '2rem' }}>イントゥ・ザ・ワイルド</h1>
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
