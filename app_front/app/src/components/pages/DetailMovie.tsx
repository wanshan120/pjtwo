import * as React from 'react';
// import { styled } from '@mui/material/styles';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// atoms
import DrawerHeader from 'components/atoms/DrawerHeader';
// organisms
import ResponsiveMenuBar from 'components/organisms/ResponsiveMenuBar';
// images
import intothewildAama from 'data/images/intothewildAma.jpg';

const PageDetailMovie = () => {
  // const theme = useTheme();
  console.log('detail');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ResponsiveMenuBar />
      <Box component="main" sx={{ maxWidth: 1280, p: 3 }}>
        <DrawerHeader />
        <Box component="div" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
          <Box
            component="div"
            style={{
              flexGrow: 1,
              maxHeight: '300px',
              maxWidth: `calc(100% - 468.75px)`,
              position: 'relative',
            }}
          >
            <img
              alt=""
              src={intothewildAama}
              style={{
                position: 'absolute',
                left: '0',
                top: '0',
                height: '100%',
                width: 'auto',
              }}
            />
          </Box>
          <Box
            component="div"
            style={{
              flexGrow: 1,
              maxHeight: '300px',
              margin: '5px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Box
              component="div"
              style={{
                position: 'relative',
                left: 0,
                top: '0',
                minHeight: '100%',
                minWidth: '100%',
                paddingTop: '56.25%',
              }}
            >
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  width: '100%',
                  height: '100%',
                }}
                src="https://www.youtube.com/embed/eQyE0Mu97Ec"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                width="560"
                height="315"
              />
            </Box>
          </Box>
        </Box>
        {/* 
        <Box>
          <Box component="div" style={{ position: 'relative' }}>
            <img
              src={intothewild}
              style={{
                position: 'absolute',
                zIndex: 2000,
                height: 'auto',
                width: 'auto',
                maxWidth: '100%',
                maxHeight: '229px',
              }}
              alt={intothewild}
              loading="lazy"
            />
          </Box>
          <Box component="div" style={{ position: 'relative', maxWidth: 800 }}>
            <Box component="div" style={{ paddingTop: '56.25%' }}>
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 2000,
                }}
                src="https://www.youtube.com/embed/eQyE0Mu97Ec"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                width="560"
                height="315"
              />
            </Box>
          </Box>
        </Box> */}

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
