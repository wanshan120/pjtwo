import * as React from 'react';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { formatDistance, subDays } from 'date-fns';
import ja from 'date-fns/locale/ja';
import Card from '@mui/material/Card';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
// icon
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// components
import DrawerHeader from 'components/elements/DrawerHeader';
import HoverRating from 'components/elements/HoverRating';
import ResponsiveMenuBar from 'features/menu/components/ResponsiveMenuBar';

import intothewildAama from 'data/images/intothewildAma.jpg';

const WriteReview = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('mobile')]: {
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: '1em',
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const HomePage = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <ResponsiveMenuBar />
    <Paper variant="outlined" component="main" sx={{ maxWidth: 1280, width: '100%', p: 3 }}>
      <DrawerHeader />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Box sx={{ width: '66px' }}>
          <Avatar
            alt="テストユーザー名１"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 50, height: 50, m: 1 }}
          />
        </Box>
        <Box sx={{ width: 'calc(100% - 66px)', m: 0 }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            rowSpacing={1}
            sx={{ mx: 1 }}
          >
            <Grid item mobile={12}>
              <Stack direction="row" justifyContent="flex-start" alignItems="center">
                <WriteReview>
                  <StyledInputBase
                    placeholder="作品タイトル"
                    inputProps={{ 'aria-label': 'review' }}
                  />
                </WriteReview>
              </Stack>
            </Grid>
            <Grid item mobile={12}>
              <HoverRating />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Card variant="outlined" sx={{ p: 2 }}>
        <Grid container direction="row">
          <Grid item mobile={12}>
            <Typography noWrap sx={{ display: 'block', fontSize: '1rem' }}>
              cyber_o_p、その他が「いいね！」しました
            </Typography>
          </Grid>
          <Grid item mobile={12}>
            <Box
              component="div"
              sx={{
                my: 1,
                p: 1,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ width: '66px' }}>
                <Avatar
                  alt="テストユーザー名１"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 50, height: 50, m: 1 }}
                />
              </Box>
              <Box sx={{ width: 'calc(100% - 66px)', m: 0 }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                  sx={{ paddingTop: 1 }}
                >
                  <Grid item mobile={12}>
                    <Typography
                      gutterBottom
                      variant="h3"
                      noWrap
                      sx={{
                        display: 'inline',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        m: 1,
                      }}
                    >
                      テストユーザー名１
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h3"
                      noWrap
                      sx={{ display: 'inline', fontSize: '1rem', m: 1 }}
                    >
                      {formatDistance(subDays(new Date(), 3), new Date(), {
                        addSuffix: true,
                        locale: ja,
                      })}
                    </Typography>
                  </Grid>
                  <Grid item mobile={12} zeroMinWidth>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-start"
                      alignItems="baseline"
                    />
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-start"
                      alignItems="baseline"
                    >
                      <Typography
                        display="inline"
                        variant="h2"
                        style={{ fontSize: '1rem', fontWeight: 'bold' }}
                      >
                        イントゥ・ザ・ワイルド
                      </Typography>
                      <Typography display="inline" style={{ fontSize: '1rem', marginLeft: '1rem' }}>
                        を評価しました
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          paddingTop: 0.5,
                          paddingBottom: 0.5,
                          px: 3,
                          textAlign: 'center',
                        }}
                      >
                        <Typography display="inline" style={{ fontSize: '1.5rem' }}>
                          S
                        </Typography>
                        <Typography display="inline" style={{ fontSize: '1.1rem', marginLeft: 7 }}>
                          8.6
                        </Typography>
                      </Paper>
                    </Stack>
                  </Grid>

                  <Grid container item mobile={12}>
                    <Grid item tablet={9}>
                      <Box
                        sx={{
                          width: '100%',
                          paddingTop: 0,
                          paddingBottom: 2,
                          paddinLeft: 0,
                          paddingRight: 2,
                        }}
                      >
                        <Chip
                          label="ネタバレ含む"
                          color="warning"
                          variant="outlined"
                          sx={{ my: 1 }}
                        />
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            marginTop: 1,
                            marginBottom: 1,
                          }}
                        >
                          前向きな旅物語ではなく、どちらかというと主人公が悲観して自分を死に追い込んでいくネガティブな人間ドラマ
                        </Typography>
                        <Typography sx={{ fontSize: '0.9rem', marginTop: 1 }}>
                          社会から、人々から逃げ回っていたらやがて地球の果てまで行ってしまう若者の悲しくも儚い自分探しの旅です。
                        </Typography>
                        <Typography sx={{ fontSize: '0.9rem', marginTop: 1 }}>
                          しっかりと自分の考えを持って、決断し、責任を持った生きた方をしているからかもしれません。道中でどんな不運に襲われようと、どんないい出会いに恵まれようと最初の目的を失わず「なにがなんでもアラスカに行くんだ」という強い意志を見せれくれたことも関係しているのかもしれません。あれだけ強い覚悟がある人って他人が意見できる隙がないもんね。中途半端な奴だと突っ込みどころが多いから説教とかされそうなもんだけど、あそこまで突き進んでたら誰も何も言えないよね
                        </Typography>
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            marginTop: 2,
                            marginBottom: 1,
                          }}
                        >
                          ただ、生きることについて
                        </Typography>
                        <Typography sx={{ fontSize: '0.9rem', marginTop: 1 }}>
                          彼になりに考えて、もがいて、そして死を迎える、ということは人生においては普遍的なことだし、なにが彼を旅へと突き動かしたのかなあ、ということは旅が好きな人にはなんとなく分かるんじゃないかと思います。
                        </Typography>
                        <Typography sx={{ fontSize: '0.9rem', marginTop: 1 }}>
                          もし普段から旅行をしないか旅行したとしてもガイドブックに載っているところとか安全なところにしか行かない。あるいはいつも旅をするときは帰る日を決めてから旅をしている人には、なんとなく遠くに行きたい、という彼の感覚は到底分からない感覚でしょうね
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item tablet={3} sx={{ lineHeight: 0 }}>
                      <img
                        src={intothewildAama}
                        alt={intothewildAama}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item mobile={12}>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="space-evenly"
                      alignItems="baseline"
                    >
                      <Box>
                        <FavoriteBorderIcon />
                        <Typography noWrap sx={{ display: 'inline', fontSize: '1rem', m: 1 }}>
                          123
                        </Typography>
                      </Box>
                      <Box>
                        <CommentIcon />
                        <Typography noWrap sx={{ display: 'inline', fontSize: '1rem', m: 1 }}>
                          23
                        </Typography>
                      </Box>
                      <Box>
                        <ReplyAllIcon />
                      </Box>
                      <Box>
                        <MoreHorizIcon />
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Card variant="outlined" sx={{ p: 2 }}>
        <Grid container direction="row">
          <Grid item mobile={12}>
            <Typography noWrap sx={{ display: 'block', fontSize: '1rem' }}>
              cyber_o_p、その他が「いいね！」しました
            </Typography>
          </Grid>
          <Grid item mobile={12}>
            <Box
              component="div"
              sx={{
                my: 1,
                p: 1,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ width: '66px' }}>
                <Avatar
                  alt="テストユーザー名１"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 50, height: 50, m: 1 }}
                />
              </Box>
              <Box sx={{ width: 'calc(100% - 66px)', m: 0 }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                  sx={{ paddingTop: 1 }}
                >
                  <Grid item mobile={12}>
                    <Typography
                      gutterBottom
                      variant="h3"
                      noWrap
                      sx={{
                        display: 'inline',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        m: 1,
                      }}
                    >
                      テストユーザー名１
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h3"
                      noWrap
                      sx={{ display: 'inline', fontSize: '1rem', m: 1 }}
                    >
                      {formatDistance(subDays(new Date(), 3), new Date(), {
                        addSuffix: true,
                        locale: ja,
                      })}
                    </Typography>
                  </Grid>
                  <Grid item mobile={12} zeroMinWidth>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-start"
                      alignItems="baseline"
                    />
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-start"
                      alignItems="baseline"
                    >
                      <Typography
                        display="inline"
                        variant="h2"
                        style={{ fontSize: '1rem', fontWeight: 'bold' }}
                      >
                        イントゥ・ザ・ワイルド
                      </Typography>
                      <Typography display="inline" style={{ fontSize: '1rem', marginLeft: '1rem' }}>
                        を評価しました
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          paddingTop: 0.5,
                          paddingBottom: 0.5,
                          px: 3,
                          textAlign: 'center',
                        }}
                      >
                        <Typography display="inline" style={{ fontSize: '1.5rem' }}>
                          S
                        </Typography>
                        <Typography display="inline" style={{ fontSize: '1.1rem', marginLeft: 7 }}>
                          8.6
                        </Typography>
                      </Paper>
                    </Stack>
                  </Grid>

                  <Grid item mobile={12}>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="space-evenly"
                      alignItems="baseline"
                      sx={{ paddingTop: 2 }}
                    >
                      <Box>
                        <FavoriteBorderIcon />
                        <Typography noWrap sx={{ display: 'inline', fontSize: '1rem', m: 1 }}>
                          123
                        </Typography>
                      </Box>
                      <Box>
                        <CommentIcon />
                        <Typography noWrap sx={{ display: 'inline', fontSize: '1rem', m: 1 }}>
                          23
                        </Typography>
                      </Box>
                      <Box>
                        <ReplyAllIcon />
                      </Box>
                      <Box>
                        <MoreHorizIcon />
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Paper>
  </Box>
);

export default HomePage;
