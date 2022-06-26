import { FC } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import intothewild from 'data/images/intothewild.webp';

const drawerWidth = 180;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const BodyContent: FC = () => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      desktop: 1500, // theme.breakpoints.up('xl')
    }}
  >
    <Toolbar />
    <Grid container spacing={2}>
      <Grid item mobile={6} laptop={4}>
        <img
          src={intothewild}
          srcSet={`${intothewild}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={intothewild}
          loading="lazy"
        />
      </Grid>
      <Grid item mobile={6} laptop={8}>
        <Item>mobile=6 md=4</Item>
      </Grid>
    </Grid>
    <Typography variant="h1" component="div" gutterBottom>
      5年の刑期
    </Typography>
    <h1>5年の刑期</h1>
    <Typography paragraph>
      5年の刑期を終え、刑務所から釈放されたビリー・ブラウンは、ニューヨーク州バッファローの実家に戻ろうとするが、長年の溝がある両親には電話で刑務所にいたことは話しておらず、電話で「政府の仕事で遠くまで行っていた」と偽る。さらに勢いで「フィアンセを連れて帰る」と嘘を並べてしまう。
    </Typography>
    <p>
      5年の刑期を終え、刑務所から釈放されたビリー・ブラウンは、ニューヨーク州バッファローの実家に戻ろうとするが、長年の溝がある両親には電話で刑務所にいたことは話しておらず、電話で「政府の仕事で遠くまで行っていた」と偽る。さらに勢いで「フィアンセを連れて帰る」と嘘を並べてしまう。
    </p>
    <Typography paragraph>
      Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
      facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt.
      Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
      mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate
      odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
      gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor.
      Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
      Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus
      vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
    </Typography>
  </Box>
);

export default BodyContent;
