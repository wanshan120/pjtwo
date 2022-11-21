import { FC } from 'react';

// MUI
// import { styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';

import ring1 from 'data/images/package/ring1.jpg';
import ring2 from 'data/images/package/ring2.jpg';
import ring3 from 'data/images/package/ring3.jpg';

const RelatedTitleList: FC = () => (
  <Grid container direction="row" spacing={1} sx={{ marginTop: 1 }}>
    <Grid item tablet={4} mobile={12}>
      <Card component="div" style={{ display: 'flex', overflow: 'hidden', padding: 0 }}>
        <Grid container direction="row">
          <Grid item tablet={12}>
            <Chip label="続編" sx={{ borderRadius: '0px' }} />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              noWrap
              sx={{ display: 'inline', fontSize: '1rem', m: 1 }}
            >
              ロードオブザリング
            </Typography>
          </Grid>
          <Grid item tablet={7} sx={{ lineHeight: 0 }}>
            <img src={ring1} alt={ring1} loading="lazy" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item tablet={5} sx={{ paddingLeft: 1, paddingRight: 1 }}>
            <Grid container spacing={0.5} direction="column">
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ margintTop: '10px' }}
              >
                <Grid item tablet={6} sx={{ textAlign: 'center' }}>
                  <NotificationAddOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                </Grid>
                <Grid item tablet={6} sx={{ textAlign: 'center' }}>
                  <BookmarkBorderOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                </Grid>
              </Grid>
              <Grid item tablet={12}>
                <Box style={{ display: 'flex' }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      paddingTop: 0.5,
                      paddingBottom: 0.5,
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    <Typography display="inline" style={{ fontSize: '1.3rem' }}>
                      S
                    </Typography>
                    <Typography display="inline" style={{ fontSize: '1.0rem', marginLeft: 7 }}>
                      8.6
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
              <Grid item>
                <Link
                  href="https://twitter.com/home"
                  color="inherit"
                  underline="hover"
                  fontSize="0.8rem"
                >
                  2007
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://twitter.com/home"
                  color="inherit"
                  underline="hover"
                  fontSize="0.8rem"
                >
                  ハイファンタジー
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://twitter.com/home"
                  color="inherit"
                  underline="hover"
                  fontSize="0.8rem"
                >
                  戦争
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://twitter.com/home"
                  color="inherit"
                  underline="hover"
                  fontSize="0.8rem"
                >
                  剣と魔法
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
    <Grid item tablet={4} mobile={12}>
      <Card component="div" style={{ display: 'flex', overflow: 'hidden', padding: 0 }}>
        <Grid container direction="row">
          <Grid item tablet={12}>
            <Chip label="続編" sx={{ borderRadius: '0px' }} />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              noWrap
              sx={{ display: 'inline', fontSize: '1rem', m: 1 }}
            >
              ロードオブザリング 二つの塔
            </Typography>
          </Grid>
          <Grid item tablet={7} sx={{ lineHeight: 0 }}>
            <img src={ring2} alt={ring2} loading="lazy" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item tablet={5} sx={{ paddingLeft: 1, paddingRight: 1 }}>
            <Grid container spacing={0.5} direction="column">
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ margintTop: '10px' }}
              >
                <Grid item tablet={6} sx={{ textAlign: 'center' }}>
                  <NotificationAddOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                </Grid>
                <Grid item tablet={6} sx={{ textAlign: 'center' }}>
                  <BookmarkBorderOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                </Grid>
              </Grid>
              <Grid item tablet={12}>
                <Box style={{ display: 'flex' }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      paddingTop: 0.5,
                      paddingBottom: 0.5,
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    <Typography display="inline" style={{ fontSize: '1.3rem' }}>
                      S
                    </Typography>
                    <Typography display="inline" style={{ fontSize: '1.0rem', marginLeft: 7 }}>
                      8.6
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
              <Grid item>
                <Link
                  href="https://twitter.com/home"
                  color="inherit"
                  underline="hover"
                  fontSize="0.8rem"
                >
                  2007
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://twitter.com/home"
                  color="inherit"
                  underline="hover"
                  fontSize="0.8rem"
                >
                  ハイファンタジー
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://twitter.com/home"
                  color="inherit"
                  underline="hover"
                  fontSize="0.8rem"
                >
                  戦争
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://twitter.com/home"
                  color="inherit"
                  underline="hover"
                  fontSize="0.8rem"
                >
                  剣と魔法
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
    <Grid item tablet={4} mobile={12}>
      <Card component="div" style={{ display: 'flex', overflow: 'hidden', padding: 0 }}>
        <Grid container direction="row">
          <Grid item tablet={12}>
            <Chip label="続編" sx={{ borderRadius: '0px' }} />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              noWrap
              sx={{ display: 'inline', fontSize: '1rem', m: 1 }}
            >
              ロードオブザリング 王の帰還
            </Typography>
          </Grid>
          <Grid item tablet={7} sx={{ lineHeight: 0 }}>
            <img src={ring3} alt={ring3} loading="lazy" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item tablet={5} sx={{ paddingLeft: 1, paddingRight: 1 }}>
            <Grid container spacing={0.5} direction="column">
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ margintTop: '10px' }}
              >
                <Grid item tablet={6} sx={{ textAlign: 'center' }}>
                  <NotificationAddOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                </Grid>
                <Grid item tablet={6} sx={{ textAlign: 'center' }}>
                  <BookmarkBorderOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                </Grid>
              </Grid>
              <Grid item tablet={12}>
                <Box style={{ display: 'flex' }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      paddingTop: 0.5,
                      paddingBottom: 0.5,
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    <Typography display="inline" style={{ fontSize: '1.3rem' }}>
                      S
                    </Typography>
                    <Typography display="inline" style={{ fontSize: '1.0rem', marginLeft: 7 }}>
                      8.6
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
              <Grid item>
                <Link
                  href="https://twitter.com/home"
                  color="inherit"
                  underline="hover"
                  fontSize="0.8rem"
                >
                  2007
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://twitter.com/home"
                  color="inherit"
                  underline="hover"
                  fontSize="0.8rem"
                >
                  ハイファンタジー
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://twitter.com/home"
                  color="inherit"
                  underline="hover"
                  fontSize="0.8rem"
                >
                  戦争
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://twitter.com/home"
                  color="inherit"
                  underline="hover"
                  fontSize="0.8rem"
                >
                  剣と魔法
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  </Grid>
);

export default RelatedTitleList;
