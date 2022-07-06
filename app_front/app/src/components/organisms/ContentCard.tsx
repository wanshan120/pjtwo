import { FC } from 'react';

// MUI
// import { styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import ChipTag from 'components/atoms/ChipTag';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';

import ring1 from 'data/images/package/ring1.jpg';
import ring2 from 'data/images/package/ring2.jpg';
import ring3 from 'data/images/package/ring3.jpg';

// import AspectRatioBlock from 'components/molecules/AspectRatioBlock';
// import AspectRatioImage from 'components/atoms/AspectRatioImage';

const ContentCard: FC = () => (
  <Grid container direction="row" spacing={1} sx={{ marginTop: 1 }}>
    <Grid item tablet={6} mobile={12} wrap="nowrap">
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
          <Grid item tablet={6}>
            <img src={ring1} alt={ring1} loading="lazy" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item tablet={6} p={1}>
            <Grid container direction="row" spacing={1}>
              <Grid item>
                <Tooltip title="公開日" arrow placement="top" enterDelay={500}>
                  <ChipTag label="2007" variant="outlined" />
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip
                  title="12歳未満の方は保護者の助言が必要です"
                  arrow
                  placement="top"
                  enterDelay={500}
                >
                  <ChipTag label="PG12" variant="outlined" />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={1} direction="column" sx={{ marginTop: 1 }}>
              <Divider sx={{ m: 1 }} />
              <Grid item tablet={12}>
                <Typography style={{ fontSize: '0.8rem', paddingBottom: 2 }}>評価指数</Typography>
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
                    <Typography display="inline" style={{ fontSize: '1.6rem' }}>
                      S
                    </Typography>
                    <Typography display="inline" style={{ fontSize: '1.2rem', marginLeft: 7 }}>
                      8.6
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
              <Divider sx={{ m: 1 }} />
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
            <CardActions>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ margintTop: '10px' }}
              >
                <Grid item tablet={6} sx={{ textAlign: 'center' }}>
                  <NotificationAddOutlinedIcon sx={{ fontSize: '1.7rem' }} />
                </Grid>
                <Grid item tablet={6} sx={{ textAlign: 'center' }}>
                  <BookmarkBorderOutlinedIcon sx={{ fontSize: '1.7rem' }} />
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Grid>
    <Grid item tablet={6} mobile={12} wrap="nowrap">
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
          <Grid item tablet={6}>
            <img src={ring2} alt={ring2} loading="lazy" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item tablet={6} p={1}>
            <Grid container direction="row" spacing={1}>
              <Grid item>
                <Tooltip title="公開日" arrow placement="top" enterDelay={500}>
                  <ChipTag label="2007" variant="outlined" />
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip
                  title="12歳未満の方は保護者の助言が必要です"
                  arrow
                  placement="top"
                  enterDelay={500}
                >
                  <ChipTag label="PG12" variant="outlined" />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={1} direction="column" sx={{ marginTop: 1 }}>
              <Divider sx={{ m: 1 }} />
              <Grid item tablet={12}>
                <Typography style={{ fontSize: '0.8rem', paddingBottom: 2 }}>評価指数</Typography>
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
                    <Typography display="inline" style={{ fontSize: '1.6rem' }}>
                      S
                    </Typography>
                    <Typography display="inline" style={{ fontSize: '1.2rem', marginLeft: 7 }}>
                      8.6
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
              <Divider sx={{ m: 1 }} />
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
            <CardActions>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ margintTop: '10px' }}
              >
                <Grid item tablet={6} sx={{ textAlign: 'center' }}>
                  <NotificationAddOutlinedIcon sx={{ fontSize: '1.7rem' }} />
                </Grid>
                <Grid item tablet={6} sx={{ textAlign: 'center' }}>
                  <BookmarkBorderOutlinedIcon sx={{ fontSize: '1.7rem' }} />
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Grid>

    <Grid item tablet={6} mobile={12} wrap="nowrap">
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
          <Grid item tablet={6}>
            <img src={ring3} alt={ring3} loading="lazy" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item tablet={6} p={1}>
            <Grid container direction="row" spacing={1}>
              <Grid item>
                <Tooltip title="公開日" arrow placement="top" enterDelay={500}>
                  <ChipTag label="2007" variant="outlined" />
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip
                  title="12歳未満の方は保護者の助言が必要です"
                  arrow
                  placement="top"
                  enterDelay={500}
                >
                  <ChipTag label="PG12" variant="outlined" />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={1} direction="column" sx={{ marginTop: 1 }}>
              <Divider sx={{ m: 1 }} />
              <Grid item tablet={12}>
                <Typography style={{ fontSize: '0.8rem', paddingBottom: 2 }}>評価指数</Typography>
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
                    <Typography display="inline" style={{ fontSize: '1.6rem' }}>
                      S
                    </Typography>
                    <Typography display="inline" style={{ fontSize: '1.2rem', marginLeft: 7 }}>
                      8.6
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
              <Divider sx={{ m: 1 }} />
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
            <CardActions>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ margintTop: '10px' }}
              >
                <Grid item tablet={6} sx={{ textAlign: 'center' }}>
                  <NotificationAddOutlinedIcon sx={{ fontSize: '1.7rem' }} />
                </Grid>
                <Grid item tablet={6} sx={{ textAlign: 'center' }}>
                  <BookmarkBorderOutlinedIcon sx={{ fontSize: '1.7rem' }} />
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  </Grid>
);

export default ContentCard;
